document.addEventListener('DOMContentLoaded', () => {
  // 1. 네비게이션 스크롤 헤더 변화
  const header = document.querySelector('header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.3)';
    } else {
      header.style.boxShadow = 'none';
    }
  });

  // 2. 신청 양식 클립보드 복사 기능
  const copyBtn = document.getElementById('btn-copy-form');
  const textarea = document.getElementById('order-template');
  const toast = document.getElementById('copy-toast');

  if (copyBtn && textarea && toast) {
    copyBtn.addEventListener('click', () => {
      // 텍스트 선택 및 복사
      textarea.select();
      textarea.setSelectionRange(0, 99999); // 모바일 대응

      navigator.clipboard.writeText(textarea.value)
        .then(() => {
          // 토스트 메시지 표시
          toast.classList.add('show');
          copyBtn.innerText = '복사 완료!';
          copyBtn.style.borderColor = 'var(--success-color)';

          setTimeout(() => {
            toast.classList.remove('show');
            copyBtn.innerText = '양식 클립보드 복사하기';
            copyBtn.style.borderColor = 'var(--panel-border)';
          }, 2500);
        })
        .catch(err => {
          console.error('클립보드 복사 실패:', err);
          alert('복사에 실패했습니다. 수동으로 복사해 주세요.');
        });
    });
  }

  // 3. 커미션 타입 카드 클릭 시 상세 모달 표시 인터랙션
  const typeCards = document.querySelectorAll('.types-grid .type-card');
  const typeDetailModal = document.getElementById('type-detail-modal');
  const typeModalImg = document.getElementById('type-modal-img');
  const typeModalTag = document.getElementById('type-modal-tag');
  const typeModalTitle = document.getElementById('type-modal-title');
  const typeModalPrice = document.getElementById('type-modal-price');
  const typeModalDesc = document.getElementById('type-modal-desc');
  const typeModalSize = document.getElementById('type-modal-size');
  const typeModalPeriod = document.getElementById('type-modal-period');
  const typeModalBg = document.getElementById('type-modal-bg');
  const typeDetailCloseBtn = document.getElementById('type-detail-close-btn');

  function openTypeModal(data) {
    if (!typeDetailModal) return;
    typeModalImg.src = data.imgSrc;
    typeModalImg.alt = data.title;
    typeModalTag.textContent = data.tag;
    typeModalTitle.textContent = data.title;
    typeModalPrice.textContent = data.price;
    typeModalDesc.textContent = data.desc;
    typeModalSize.textContent = data.size;
    typeModalPeriod.textContent = data.period;
    typeModalBg.textContent = data.bg;

    typeDetailModal.classList.add('show');
    typeDetailModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden'; // 뒷배경 스크롤 방지
  }

  function closeTypeModal() {
    if (!typeDetailModal) return;
    typeDetailModal.classList.remove('show');
    typeDetailModal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = ''; // 스크롤 복구
    
    // 페이드아웃 트랜지션 완료 후 이미지 리소스 해제
    setTimeout(() => {
      if (!typeDetailModal.classList.contains('show')) {
        typeModalImg.src = '';
      }
    }, 400);
  }

  typeCards.forEach(card => {
    card.addEventListener('click', () => {
      const img = card.querySelector('img');
      if (img) {
        const imgSrc = img.getAttribute('src');
        const tag = card.getAttribute('data-type-tag') || 'COMMISSION';
        const title = card.getAttribute('data-type-title') || 'Commission Type';
        const price = card.getAttribute('data-type-price') || '문의 필요';
        const desc = card.getAttribute('data-type-desc') || '';
        const size = card.getAttribute('data-type-size') || '-';
        const period = card.getAttribute('data-type-period') || '-';
        const bg = card.getAttribute('data-type-bg') || '-';

        openTypeModal({ imgSrc, tag, title, price, desc, size, period, bg });
      }
    });
  });

  if (typeDetailCloseBtn) {
    typeDetailCloseBtn.addEventListener('click', closeTypeModal);
  }

  if (typeDetailModal) {
    typeDetailModal.addEventListener('click', (e) => {
      if (e.target === typeDetailModal) {
        closeTypeModal();
      }
    });
  }

  // 4. 갤러리 무한 드래그 및 관성 롤링 인터랙션
  const marqueeWrapper = document.querySelector('.marquee-wrapper');
  const marqueeTrack = document.querySelector('.marquee-track');
  
  if (marqueeWrapper && marqueeTrack) {
    // 갤러리 카드 무한 루프 구현을 위한 동적 자식 노드 복제
    const originalCards = Array.from(marqueeTrack.children);
    originalCards.forEach(card => {
      const clone = card.cloneNode(true);
      marqueeTrack.appendChild(clone);
    });

    let isDragging = false;
    let startX = 0;
    let currentX = 0;
    let translateX = 0;
    let scrollLeft = 0;
    let velocity = 0;
    let lastX = 0;
    let lastTime = 0;
    
    // 스크롤 제어 속도 및 마찰 변수
    const baseSpeed = -1.2; // 기본 자동 스크롤 속도 (음수: 왼쪽 이동)
    let currentSpeed = baseSpeed;
    const friction = 0.95;  // 관성 감속 마찰력 계수
    let isHovered = false;
    let limit = 0;
    
    // 루프 경계(limit) 계산 함수: 원본 카드 세트의 총 너비 계산
    function calculateLimit() {
      limit = marqueeTrack.scrollWidth / 2;
    }
    
    // 이미지 로드 완료 및 리사이즈 시점의 경계 재측정
    window.addEventListener('load', calculateLimit);
    window.addEventListener('resize', calculateLimit);
    // 초기 측정
    calculateLimit();

    // 드래그 시작 처리
    const startDrag = (e) => {
      isDragging = true;
      marqueeWrapper.classList.add('grabbing');
      
      const pageX = e.touches ? e.touches[0].pageX : e.pageX;
      startX = pageX;
      lastX = pageX;
      scrollLeft = translateX;
      velocity = 0;
      lastTime = performance.now();
    };

    // 드래그 진행 중 처리
    const drag = (e) => {
      if (!isDragging) return;
      
      const pageX = e.touches ? e.touches[0].pageX : e.pageX;
      const now = performance.now();
      const dt = now - lastTime;
      
      const deltaX = pageX - startX;
      translateX = scrollLeft + deltaX;
      
      // 속도(이동 거리 / 시간) 측정 및 필터링 적용
      if (dt > 0) {
        const instantVelocity = (pageX - lastX) / dt * 16.666; // 1프레임(16.6ms) 단위 속도로 환산
        velocity = velocity * 0.7 + instantVelocity * 0.3;     // 지수 이동 평균으로 튀는 값 방지
      }
      
      lastX = pageX;
      lastTime = now;
      
      // 드래그 중인 동안에도 무한 스크롤 한계 보정
      if (limit > 0) {
        if (translateX < -limit) {
          translateX += limit;
          startX += limit;
          scrollLeft += limit;
        } else if (translateX > 0) {
          translateX -= limit;
          startX -= limit;
          scrollLeft -= limit;
        }
      }
      
      marqueeTrack.style.transform = `translateX(${translateX}px)`;
    };

    // 드래그 종료 처리
    const endDrag = () => {
      if (!isDragging) return;
      isDragging = false;
      marqueeWrapper.classList.remove('grabbing');
      
      currentSpeed = velocity;
      
      // 너무 과도하게 빠른 속도는 제한 (가속도 상한선 설정)
      const maxVelocity = 35;
      if (Math.abs(currentSpeed) > maxVelocity) {
        currentSpeed = Math.sign(currentSpeed) * maxVelocity;
      }
    };

    // 마우스 호버 감지
    marqueeWrapper.addEventListener('mouseenter', () => {
      isHovered = true;
    });
    
    marqueeWrapper.addEventListener('mouseleave', () => {
      isHovered = false;
      endDrag(); // 마우스가 갤러리를 벗어날 때도 드래그 해제
    });

    // 이벤트 리스너 등록 (마우스)
    marqueeWrapper.addEventListener('mousedown', startDrag);
    window.addEventListener('mousemove', drag);
    window.addEventListener('mouseup', endDrag);

    // 이벤트 리스너 등록 (터치 - 모바일 대응)
    marqueeWrapper.addEventListener('touchstart', startDrag, { passive: true });
    window.addEventListener('touchmove', drag, { passive: false });
    window.addEventListener('touchend', endDrag);

    // 메인 루프 실행
    const animate = () => {
      if (limit === 0) {
        calculateLimit();
      }

      if (!isDragging && limit > 0) {
        if (isHovered) {
          // 호버 중일 때는 부드럽게 감속하여 일시정지 상태로 전환
          currentSpeed *= 0.85;
          if (Math.abs(currentSpeed) < 0.05) currentSpeed = 0;
        } else {
          // 호버 해제 시: 남은 관성 속도를 점차 감속하고, 원래 자동 스크롤 속도로 부드럽게 복구
          if (Math.abs(currentSpeed - baseSpeed) > 0.05) {
            currentSpeed *= friction;
            currentSpeed = currentSpeed * 0.98 + baseSpeed * 0.02; // 서서히 baseSpeed로 끌어당김
          } else {
            currentSpeed = baseSpeed;
          }
        }
        
        translateX += currentSpeed;
        
        // 자동 롤링 시 무한 루프 한계 보정
        if (translateX < -limit) {
          translateX += limit;
        } else if (translateX > 0) {
          translateX -= limit;
        }
        
        marqueeTrack.style.transform = `translateX(${translateX}px)`;
      }
      
      requestAnimationFrame(animate);
    };
    
    requestAnimationFrame(animate);
  }

  // 5. 마우스 트래킹 툴팁 구현
  const tooltipEl = document.createElement('div');
  tooltipEl.id = 'mouse-tooltip';
  tooltipEl.className = 'mouse-tooltip';
  document.body.appendChild(tooltipEl);

  const tooltipTargets = document.querySelectorAll('[data-tooltip]');
  tooltipTargets.forEach(target => {
    target.addEventListener('mouseenter', () => {
      const text = target.getAttribute('data-tooltip');
      if (text) {
        tooltipEl.textContent = text;
        tooltipEl.classList.add('show');
      }
    });

    target.addEventListener('mousemove', (e) => {
      const x = e.clientX;
      const y = e.clientY;
      
      // 툴팁의 가로세로 크기가 아직 0인 경우 기본값 할당
      const tooltipWidth = tooltipEl.offsetWidth || 180;
      const tooltipHeight = tooltipEl.offsetHeight || 45;
      
      // 기본적으로 마우스 우측 하단에 배치하여 포인터가 툴팁을 침범하지 않게 함
      let posX = x + 20;
      let posY = y + 15;
      
      // 뷰포트 우측 경계 검사 (화면 밖으로 나가면 마우스 좌측으로 이동)
      if (posX + tooltipWidth > window.innerWidth) {
        posX = x - tooltipWidth - 20;
      }
      // 뷰포트 하단 경계 검사 (화면 아래로 나가면 마우스 위로 이동)
      if (posY + tooltipHeight > window.innerHeight) {
        posY = y - tooltipHeight - 15;
      }
      
      tooltipEl.style.left = `${posX}px`;
      tooltipEl.style.top = `${posY}px`;
    });

    target.addEventListener('mouseleave', () => {
      tooltipEl.classList.remove('show');
    });
  });

  // 6. 이미지 상세 모달 구현 및 드래그 구분 로직
  const imageModal = document.getElementById('image-modal');
  const modalImg = document.getElementById('modal-img');
  const modalTag = document.getElementById('modal-tag');
  const modalTitle = document.getElementById('modal-title');
  const modalDesc = document.getElementById('modal-desc');
  const modalAuthor = document.getElementById('modal-author');
  const modalDate = document.getElementById('modal-date');
  const modalCloseBtn = document.getElementById('modal-close-btn');

  let clickStartX = 0;
  let clickStartY = 0;
  let isClickPrevented = false;

  function openModal(data) {
    if (!imageModal) return;
    modalImg.src = data.imgSrc;
    modalImg.alt = data.title;
    modalTag.textContent = data.tag;
    modalTitle.textContent = data.title;
    modalDesc.textContent = data.desc;
    modalAuthor.textContent = data.author;
    modalDate.textContent = data.date;

    imageModal.classList.add('show');
    imageModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden'; // 뒷배경 스크롤 방지
  }

  function closeModal() {
    if (!imageModal) return;
    imageModal.classList.remove('show');
    imageModal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = ''; // 스크롤 복구
    
    // 페이드아웃 트랜지션 완료 후 이미지 리소스 해제 (깜빡임 방지)
    setTimeout(() => {
      if (!imageModal.classList.contains('show')) {
        modalImg.src = '';
      }
    }, 400);
  }

  if (marqueeTrack) {
    // 마우스 누름 시 좌표 기록
    marqueeTrack.addEventListener('mousedown', (e) => {
      clickStartX = e.clientX;
      clickStartY = e.clientY;
      isClickPrevented = false;
    });

    // 마우스 뗌 시 이동 거리가 5px 초과이면 드래그로 판정하여 클릭 방지
    marqueeTrack.addEventListener('mouseup', (e) => {
      const diffX = e.clientX - clickStartX;
      const diffY = e.clientY - clickStartY;
      const dist = Math.sqrt(diffX * diffX + diffY * diffY);
      if (dist > 5) {
        isClickPrevented = true;
      }
    });

    // 모바일 터치 이벤트 대응
    marqueeTrack.addEventListener('touchstart', (e) => {
      if (e.touches && e.touches.length > 0) {
        clickStartX = e.touches[0].clientX;
        clickStartY = e.touches[0].clientY;
      }
      isClickPrevented = false;
    }, { passive: true });

    marqueeTrack.addEventListener('touchend', (e) => {
      if (e.changedTouches && e.changedTouches.length > 0) {
        const diffX = e.changedTouches[0].clientX - clickStartX;
        const diffY = e.changedTouches[0].clientY - clickStartY;
        const dist = Math.sqrt(diffX * diffX + diffY * diffY);
        if (dist > 5) {
          isClickPrevented = true;
        }
      }
    });

    // 갤러리 카드 클릭 이벤트 처리 (이벤트 위임 적용)
    marqueeTrack.addEventListener('click', (e) => {
      // 드래그가 발생한 상태라면 클릭 핸들러 동작을 스킵함
      if (isClickPrevented) {
        isClickPrevented = false; // 플래그 초기화
        return;
      }

      const card = e.target.closest('.gallery-card');
      if (!card) return;

      const img = card.querySelector('img');
      const tagEl = card.querySelector('.card-tag');
      const titleEl = card.querySelector('h4');

      if (img && titleEl) {
        const imgSrc = img.getAttribute('src');
        const tag = tagEl ? tagEl.textContent : 'COMMISSION';
        const title = titleEl.textContent;
        const desc = card.getAttribute('data-desc') || '상세 정보가 등록되지 않았습니다.';
        const author = card.getAttribute('data-author') || 'FuriousSmile';
        const date = card.getAttribute('data-date') || '-';

        openModal({ imgSrc, tag, title, desc, author, date });
      }
    });
  }

  // 모달 닫기 버튼 핸들러
  if (modalCloseBtn) {
    modalCloseBtn.addEventListener('click', closeModal);
  }

  // 모달 배경 클릭 시 닫기
  if (imageModal) {
    imageModal.addEventListener('click', (e) => {
      if (e.target === imageModal) {
        closeModal();
      }
    });
  }

  // ESC 키 클릭 시 닫기
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      if (imageModal && imageModal.classList.contains('show')) {
        closeModal();
      }
      if (typeDetailModal && typeDetailModal.classList.contains('show')) {
        closeTypeModal();
      }
    }
  });

  // 7. 신체 범위 가이드 이미지 줌 모달 기능
  const guideImgCard = document.getElementById('guide-img-card');
  const guideModal = document.getElementById('guide-modal');
  const guideModalClose = document.getElementById('guide-modal-close');

  if (guideImgCard && guideModal) {
    guideImgCard.addEventListener('click', () => {
      guideModal.classList.add('active');
      guideModal.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
    });

    const closeGuideModal = () => {
      guideModal.classList.remove('active');
      guideModal.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    };

    if (guideModalClose) {
      guideModalClose.addEventListener('click', closeGuideModal);
    }

    guideModal.addEventListener('click', (e) => {
      if (e.target === guideModal) {
        closeGuideModal();
      }
    });

    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && guideModal.classList.contains('active')) {
        closeGuideModal();
      }
    });
  }
});
