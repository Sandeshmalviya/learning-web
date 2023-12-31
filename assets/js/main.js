/**
 * Template Name: Arsha
 * Updated: May 30 2023 with Bootstrap v5.3.0
 * Template URL: https://bootstrapmade.com/arsha-free-bootstrap-html-template-corporate/
 * Author: BootstrapMade.com
 * License: https://bootstrapmade.com/license/
 */
(function () {
  "use strict";

  /**
   * Easy selector helper function
   */
  const select = (el, all = false) => {
    el = el.trim();
    if (all) {
      return [...document.querySelectorAll(el)];
    } else {
      return document.querySelector(el);
    }
  };

  /**
   * Easy event listener function
   */
  const on = (type, el, listener, all = false) => {
    let selectEl = select(el, all);
    if (selectEl) {
      if (all) {
        selectEl.forEach((e) => e.addEventListener(type, listener));
      } else {
        selectEl.addEventListener(type, listener);
      }
    }
  };

  /**
   * Easy on scroll event listener
   */
  const onscroll = (el, listener) => {
    el.addEventListener("scroll", listener);
  };

  /**
   * Navbar links active state on scroll
   */
  let navbarlinks = select("#navbar .scrollto", true);
  const navbarlinksActive = () => {
    let position = window.scrollY + 200;
    navbarlinks.forEach((navbarlink) => {
      if (!navbarlink.hash) return;
      let section = select(navbarlink.hash);
      if (!section) return;
      if (
        position >= section.offsetTop &&
        position <= section.offsetTop + section.offsetHeight
      ) {
        navbarlink.classList.add("active");
      } else {
        navbarlink.classList.remove("active");
      }
    });
  };
  window.addEventListener("load", navbarlinksActive);
  onscroll(document, navbarlinksActive);

  /**
   * Scrolls to an element with header offset
   */
  const scrollto = (el) => {
    let header = select("#header");
    let offset = header.offsetHeight;

    let elementPos = select(el).offsetTop;
    window.scrollTo({
      top: elementPos - offset,
      behavior: "smooth",
    });
  };

  /**
   * Toggle .header-scrolled class to #header when page is scrolled
   */
  let selectHeader = select("#header");
  if (selectHeader) {
    const headerScrolled = () => {
      if (window.scrollY > 100) {
        selectHeader.classList.add("header-scrolled");
      } else {
        selectHeader.classList.remove("header-scrolled");
      }
    };
    window.addEventListener("load", headerScrolled);
    onscroll(document, headerScrolled);
  }

  /**
   * Back to top button
   */
  let backtotop = select(".back-to-top");
  if (backtotop) {
    const toggleBacktotop = () => {
      if (window.scrollY > 100) {
        backtotop.classList.add("active");
      } else {
        backtotop.classList.remove("active");
      }
    };
    window.addEventListener("load", toggleBacktotop);
    onscroll(document, toggleBacktotop);
  }

  /**
   * Mobile nav toggle
   */
  on("click", ".mobile-nav-toggle", function (e) {
    select("#navbar").classList.toggle("navbar-mobile");
    this.classList.toggle("bi-list");
    this.classList.toggle("bi-x");
  });

  /**
   * Mobile nav dropdowns activate
   */
  on(
    "click",
    ".navbar .dropdown > a",
    function (e) {
      if (select("#navbar").classList.contains("navbar-mobile")) {
        e.preventDefault();
        this.nextElementSibling.classList.toggle("dropdown-active");
      }
    },
    true
  );

  /**
   * Scrool with ofset on links with a class name .scrollto
   */
  on(
    "click",
    ".scrollto",
    function (e) {
      if (select(this.hash)) {
        e.preventDefault();

        let navbar = select("#navbar");
        if (navbar.classList.contains("navbar-mobile")) {
          navbar.classList.remove("navbar-mobile");
          let navbarToggle = select(".mobile-nav-toggle");
          navbarToggle.classList.toggle("bi-list");
          navbarToggle.classList.toggle("bi-x");
        }
        scrollto(this.hash);
      }
    },
    true
  );

  /**
   * Scroll with ofset on page load with hash links in the url
   */
  window.addEventListener("load", () => {
    if (window.location.hash) {
      if (select(window.location.hash)) {
        scrollto(window.location.hash);
      }
    }
  });

  /**
   * Preloader
   */
  let preloader = select("#preloader");
  if (preloader) {
    window.addEventListener("load", () => {
      preloader.remove();
    });
  }

  /**
   * Initiate  glightbox
   */
  const glightbox = GLightbox({
    selector: ".glightbox",
  });

  /**
   * Skills animation
   */
  let skilsContent = select(".skills-content");
  if (skilsContent) {
    new Waypoint({
      element: skilsContent,
      offset: "80%",
      handler: function (direction) {
        let progress = select(".progress .progress-bar", true);
        progress.forEach((el) => {
          el.style.width = el.getAttribute("aria-valuenow") + "%";
        });
      },
    });
  }

  /**
   * Porfolio isotope and filter
   */
  window.addEventListener("load", () => {
    let portfolioContainer = select(".portfolio-container");
    if (portfolioContainer) {
      let portfolioIsotope = new Isotope(portfolioContainer, {
        itemSelector: ".portfolio-item",
      });

      let portfolioFilters = select("#portfolio-flters li", true);

      on(
        "click",
        "#portfolio-flters li",
        function (e) {
          e.preventDefault();
          portfolioFilters.forEach(function (el) {
            el.classList.remove("filter-active");
          });
          this.classList.add("filter-active");

          portfolioIsotope.arrange({
            filter: this.getAttribute("data-filter"),
          });
          portfolioIsotope.on("arrangeComplete", function () {
            AOS.refresh();
          });
        },
        true
      );
    }
  });

  /**
   * Initiate portfolio lightbox
   */
  const portfolioLightbox = GLightbox({
    selector: ".portfolio-lightbox",
  });

  /**
   * Portfolio details slider
   */
  new Swiper(".portfolio-details-slider", {
    speed: 400,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false,
    },
    pagination: {
      el: ".swiper-pagination",
      type: "bullets",
      clickable: true,
    },
  });

  /**
   * Animation on scroll
   */
  window.addEventListener("load", () => {
    AOS.init({
      duration: 1000,
      easing: "ease-in-out",
      once: true,
      mirror: false,
    });
  });
})();

// ................form data start..............

function resetForm() {
  document.getElementById("name").value = "";
  document.getElementById("email").value = "";
  document.getElementById("message").value = "";
  document.getElementById("successMessage").style.display = "";
}

function submitForm(event) {
  event.preventDefault();

  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const message = document.getElementById("message").value;

  const formData = {
    name,
    email,
    message,
  };
  fetch("https://personal-api-my41.vercel.app/api/users", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  })
    .then((response) => response.json())
    .then((data) => {
      document.getElementById("successMessage").style.display = "block";
      resetForm();
      setTimeout(() => {
        document.getElementById("successMessage").style.display = "none";
      }, 3000);
      fetchDataAndPopulateTable();
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}
// // ................form data end..............

// // ................Table data start..............

function fetchDataAndPopulateTable() {
  fetch("https://personal-api-my41.vercel.app/api/users")
    .then((response) => response.json())
    .then((data) => {
      const tableBody = document.getElementById("data");

      tableBody.innerHTML = "";

      if (data.length === 0) {
        const noDataRow = document.createElement("tr");
        noDataRow.innerHTML = `
          <td colspan="5" style="text-align: center" class="text-primary">
          <br/><br/>
          <h3>No Data Available</h3>
          <br/><br/>
          </td>
        `;
        tableBody.appendChild(noDataRow);
      } else {
        data.forEach((item, index) => {
          const row = document.createElement("tr");

          row.innerHTML = `
              <td style="text-align: center">${index + 1}</td>
              <td style="text-align: center">${item.name}</td>
              <td style="text-align: center">${item.email}</td>
              <td style="text-align: center">${item.message}</td>
              <td style="text-align: center"><i class="material-icons" style="color: #dc3545"
              onclick="deleteRow('${item._id}')"
              >delete </i>
              <i class="material-icons" style="color: #0d6efd"
              <i class="material-icons" style="color: #0d6efd"
              onclick="editRow('${item._id}', '${item.name}', '${
            item.email
          }', '${item.message}')"
             >edit</i>
              </td>
            `;
          tableBody.appendChild(row);
        });
      }
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
    });
}

document.addEventListener("DOMContentLoaded", fetchDataAndPopulateTable);
// // ................Table data end..............

// // ...............delete data start..............

function deleteRow(id) {
  // Show a confirmation dialog
  const confirmation = confirm("Are you sure you want to delete this data ?");

  if (confirmation) {
    fetch(`https://personal-api-my41.vercel.app/api/users/${id}`, {
      method: "DELETE",
    })
      .then(() => {
        const rowToDelete = document.querySelector(`tr[data-id="${id}"]`);
        if (rowToDelete) {
          rowToDelete.remove();
        }
        fetchDataAndPopulateTable();
      })
      .catch((error) => {
        console.error("Error deleting data:", error);
      });
  }
}

// // ...............delete data end..............

// // ...............edit data start..............

function editRow(id, oldName, oldEmail, oldMessage) {
  const newName = prompt("Enter new name:", oldName);
  const newEmail = prompt("Enter new email:", oldEmail);
  const newMessage = prompt("Enter new message:", oldMessage);

  if (newName !== null && newEmail !== null && newMessage !== null) {
    const updatedData = {
      name: newName,
      email: newEmail,
      message: newMessage,
    };

    fetch(`https://personal-api-my41.vercel.app/api/users/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedData),
    })
      .then(() => {
        fetchDataAndPopulateTable();
      })
      .catch((error) => {
        console.error("Error updating data:", error);
      });
  }
}

// // ...............edit data end..............
