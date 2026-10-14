document.addEventListener("DOMContentLoaded", () => {

  // 1. Fungsi Animasi Mengetik Berurutan (Typing Effect)
  function typeWriter(element, text, speed = 50, callback = null) {
    let i = 0;
    element.textContent = ""; // Kosongkan teks awal
    
    function type() {
      if (i < text.length) {
        element.textContent += text.charAt(i);
        i++;
        setTimeout(type, speed);
      } else {
        element.classList.add("typing-done"); // Hapus kursor berkedip setelah selesai
        if (callback) callback();
      }
    }
    type();
  }

  // Ambil semua elemen judul bertarget
  const typingElements = document.querySelectorAll(".typing-target");
  const bioTextbox = document.querySelector(".bio-text");

  function startSequentialTyping(index = 0) {
    if (index < typingElements.length) {
      const el = typingElements[index];
      const textToType = el.getAttribute("data-text") || "";
      const speed = index === 0 ? 50 : 35; 
      
      typeWriter(el, textToType, speed, () => {
        // Tepat setelah tulisan "Tentang Saya" selesai diketik, jalankan animasi lambat pada textbox
        if (textToType.toLowerCase().includes("tentang saya") && bioTextbox) {
          bioTextbox.classList.add("start-swipe");
        }
        
        // Lanjutkan mengetik judul berikutnya
        startSequentialTyping(index + 1);
      });
    }
  }

  // Mulai alur pengetikan otomatis
  startSequentialTyping(0);

  // 2. Efek Interaktif pada Judul Utama saat Diklik
  const title = document.querySelector(".header-section h2");
  if (title) {
    title.addEventListener("click", () => {
      title.style.transform = "scale(1.05) skewX(-5deg)";
      title.style.color = "var(--p2-yellow)";
      
      setTimeout(() => {
        title.style.transform = "none";
        title.style.color = "var(--p2-white)";
      }, 300);
    });
  }

  // 3. Efek Hover Baris Tabel (Staggered Animation)
  const rows = document.querySelectorAll(".persona-table tbody tr");
  rows.forEach((row, index) => {
    row.style.opacity = "0";
    row.style.transform = "translateY(20px)";
    
    setTimeout(() => {
      row.style.transition = "all 0.5s ease";
      row.style.opacity = "1";
      row.style.transform = "translateY(0)";
    }, 200 * (index + 1));
  });

  // 4. Efek Hover 3D Tilt / Movement pada Foto Profil (Model Pertama)
  const imgFrame = document.querySelector(".img-frame");
  if (imgFrame) {
    imgFrame.addEventListener("mousemove", (e) => {
      const rect = imgFrame.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      
      // Rotasi 3D mengikuti kursor mouse
      imgFrame.style.transform = `perspective(500px) rotateX(${-y / 8}deg) rotateY(${x / 8}deg) scale(1.08)`;
      imgFrame.style.boxShadow = `${-x / 5}px ${-y / 5}px 12px rgba(255, 204, 0, 0.6)`;
    });

    imgFrame.addEventListener("mouseleave", () => {
      // Kembali ke posisi semula saat mouse meninggalkan elemen
      imgFrame.style.transform = "perspective(500px) rotateX(0deg) rotateY(0deg) scale(1)";
      imgFrame.style.boxShadow = "4px 4px 0px var(--p2-yellow)";
    });
  }

  // 5. Render Pie Chart Bertema Persona 2 menggunakan Chart.js
  const isDesktop = window.innerWidth >= 900;
  const ctx = document.getElementById('personaChart').getContext('2d');
  
  const personaChart = new Chart(ctx, {
    type: 'pie',
    data: {
      labels: ['Multilingual', 'Laravel', 'Adaptasi Teknologi Baru'],
      datasets: [{
        data: [30, 20, 50],
        backgroundColor: [
          '#d50000', // Merah Persona
          '#ffcc00', // Kuning Khas UI
          '#404040'  // Abu-abu Gelap Kontras
        ],
        borderColor: '#0d0d0d',
        borderWidth: 3,
        hoverOffset: 10
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: isDesktop ? 'right' : 'bottom',
          labels: {
            color: '#f5f5f5',
            font: {
              family: 'Rajdhani',
              size: isDesktop ? 16 : 13,
              weight: 'bold'
            },
            padding: isDesktop ? 20 : 10
          }
        },
        tooltip: {
          backgroundColor: '#1a1a1a',
          titleColor: '#ffcc00',
          bodyColor: '#f5f5f5',
          borderColor: '#d50000',
          borderWidth: 1,
          callbacks: {
            label: function(context) {
              return ` ${context.label}: ${context.raw}%`;
            }
          }
        }
      },
      animation: {
        animateScale: true,
        animateRotate: true,
        duration: 1500
      }
    }
  });
});