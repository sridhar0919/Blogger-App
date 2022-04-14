import React from 'react';
import './css/Footer.css';

export default function Footer() {
  return (
    <div className="footer-totalcontent">
      <div>
        <h3>BLOGGER</h3>
        <p className="copyright">Copyright&nbsp;&#169;&nbsp;2022 Blogger</p>
      </div>
      <div>
        <h3>Contact</h3>
        <p>
          <i class="fa-solid fa-phone"></i>&nbsp; (044) 24781432
        </p>
        <p>
          <i class="fa-solid fa-phone"></i>&nbsp; (044) 24782332
        </p>
      </div>
      <div>
        <h3>Email</h3>
        <p>
          <i class="fa-solid  fa-envelope"></i> &nbsp;bloggerapp11@gmail.com
        </p>
        <p>
          <i class="fa-solid  fa-envelope"></i> &nbsp;bloggerapp22@gmail.com
        </p>
      </div>
    </div>
  );
}
