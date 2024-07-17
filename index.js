document.addEventListener('DOMContentLoaded', () => {
  fetchMenuItems();

  // Add event listeners for navigation links
  document.querySelectorAll('header nav ul li a').forEach(link => {
      link.addEventListener('click', (e) => {
          e.preventDefault();
          const targetId = e.target.getAttribute('href').substring(1);
          showSection(targetId);
      });
  });

  // Show home section by default
  showSection('home');
});

async function fetchMenuItems() {
  try {
      const response = await fetch('https://munchdb.onrender.com/menu');
      if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      displayMenuItems(data);
  } catch (error) {
      console.error('Error fetching menu items:', error.message);
  }
}

function displayMenuItems(menuItems) {
  const menuContainer = document.getElementById('menu-items');
  menuContainer.innerHTML = '';

  Object.keys(menuItems).forEach(category => {
      const categoryHeader = document.createElement('div');
      categoryHeader.className = 'menu-category-header';
      categoryHeader.textContent = category;
      categoryHeader.addEventListener('click', () => {
          toggleCategoryItems(category);
      });

      const categoryItemsContainer = document.createElement('div');
      categoryItemsContainer.className = 'category-items';

      menuItems[category].items.forEach(item => {
          const menuItemDiv = document.createElement('div');
          menuItemDiv.className = 'menu-item';
          menuItemDiv.innerHTML = `
              <h3>${item.name}</h3>
              <p>${item.description}</p>
              <p>Price: $${item.price}</p>
              <button onclick="addToCart('${item.name}', ${item.price})">Add to Cart</button>
          `;
          categoryItemsContainer.appendChild(menuItemDiv);
      });

      categoryItemsContainer.style.display = 'none'; // Hide items initially

      menuContainer.appendChild(categoryHeader);
      menuContainer.appendChild(categoryItemsContainer);
  });
}

function addToCart(name, price) {
  const cartContainer = document.getElementById('cart-items');
  const cartItemDiv = document.createElement('div');
  cartItemDiv.className = 'cart-item';
  cartItemDiv.innerHTML = `
      <h3>${name}</h3>
      <p>Price: $${price}</p>
  `;
  cartContainer.appendChild(cartItemDiv);
}

function showSection(sectionId) {
  document.querySelectorAll('section').forEach(section => {
      if (section.id === sectionId) {
          section.style.display = 'block';
      } else {
          section.style.display = 'none';
      }
  });
}

function toggleCategoryItems(category) {
  const categoryItemsContainers = document.querySelectorAll('.category-items');
  categoryItemsContainers.forEach(container => {
      if (container.previousElementSibling.textContent === category) {
          if (container.style.display === 'none') {
              container.style.display = 'flex'; // Display as flex container
          } else {
              container.style.display = 'none';
          }
      } else {
          container.style.display = 'none';
      }
  });
}
