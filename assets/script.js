// Efek interaktif & animasi tambahan menggunakan JavaScript
document.addEventListener("DOMContentLoaded", () => {
  // 1. Efek Sound/Glitch Visual Dinamis pada Judul saat Diklik
  const title = document.querySelector(".header-section h2");
  
  title.addEventListener("click", () => {
    title.style.transform = "scale(1.05) skewX(-5deg)";
    title.style.color = "var(--p2-yellow)";
    
    setTimeout(() => {
      title.style.transform = "none";
      title.style.color = "var(--p2-white)";
    }, 300);
  });

  // 2. Efek Hover Baris Tabel Menyoroti Elemen secara Random (Gaya UI RPG Klasik)
  const rows = document.querySelectorAll(".persona-table tbody tr");
  rows.forEach((row, index) => {
    row.style.opacity = "0";
    row.style.transform = "translateY(20px)";
    
    // Animasi Staggered (muncul berurutan)
    setTimeout(() => {
      row.style.transition = "all 0.5s ease";
      row.style.opacity = "1";
      row.style.transform = "translateY(0)";
    }, 200 * (index + 1));
  });

  // 3. Efek Interaktif Gambar Profil Berubah Efek Skala/Goyang Halus saat Digeser Mouse
  const imgFrame = document.querySelector(".img-frame");
  imgFrame.addEventListener("mousemove", (e) => {
    const rect = imgFrame.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    
    imgFrame.style.transform = `perspective(500px) rotateX(${-y / 10}deg) rotateY(${x / 10}deg) scale(1.05)`;
  });

  imgFrame.addEventListener("mouseleave", () => {
    imgFrame.style.transform = "perspective(500px) rotateX(0deg) rotateY(0deg) scale(1)";
  });

  // 4. Render Pie Chart Bertema Persona 2
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
        hoverOffset: 6
      }]
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          position: 'bottom',
          labels: {
            color: '#f5f5f5',
            font: {
              family: 'Rajdhani',
              size: 14,
              weight: 'bold'
            },
            padding: 15
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