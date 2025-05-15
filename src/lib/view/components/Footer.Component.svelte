<footer class="footer">
  <div class="footer-container" data-testid="footer-container">
    <div class="footer-column" data-testid="footer-column">
      <h3>About Us</h3>
      <ul>
        <li><a href="/#">Who We Are</a></li>
        <li><a href="/#">Join as a Seller</a></li>
        <li><a href="/#">News</a></li>
      </ul>
    </div>
    <div class="footer-column" data-testid="footer-column">
      <h3>Customer Support</h3>
      <ul>
        <li><a href="/#">Help Center</a></li>
        <li><a href="/#">FAQs</a></li>
        <li><a href="/#">Contact Us</a></li>
      </ul>
    </div>
    <div class="footer-column" data-testid="footer-column">
      <h3>Account</h3>
      <ul>
        <li><a href="/#/profile">My Account</a></li>
        <li><a href="/#">Order History</a></li>
        <li><a href="/#">Wishlist</a></li>
      </ul>
    </div>
    <div class="footer-column" data-testid="footer-column">
      <h3>Legal Information</h3>
      <ul>
        <li><a href="/#">Privacy Policy</a></li>
        <li><a href="/#">Terms & Conditions</a></li>
        <li><a href="/#">Return Policy</a></li>
      </ul>
    </div>
  </div>

  <hr class="footer-separator" />

  <p class="footer-copy">© Copyright. All rights reserved.</p>
</footer>

<style>
  .footer {
    background-color: #3f028f;
    color: white;
    padding: 40px 20px;
    margin-top: 60px;
    text-align: center;
  }

  .footer-container {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 20px;
    max-width: 1200px;
    margin: 0 auto;
    text-align: center;
  }

  .footer-column {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .footer-column h3 {
    margin-bottom: 10px;
    font-size: 18px;
  }

  .footer-column ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  .footer-column ul li {
    margin-bottom: 8px;
  }

  .footer-column ul li a {
    color: white;
    text-decoration: none;
    font-size: 14px;
  }

  .footer-column ul li a:hover {
    text-decoration: underline;
  }

  .footer-separator {
    border: none;
    height: 1px;
    background-color: #666;
    margin: 30px auto;
    width: 80%;
  }

  .footer-copy {
    font-size: 12px;
    margin-top: 10px;
  }

  @media (max-width: 900px) {
    .footer-container {
      grid-template-columns: repeat(2, 1fr);
    }
  }

  @media (max-width: 480px) {
    .footer-container {
      grid-template-columns: 1fr;
    }
  }
</style>
