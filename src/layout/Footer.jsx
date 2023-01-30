import React from "react";

const Footer = () => {
  return (
    <footer className="mx-auto container py-10 px-5 ">
      <div className="grid grid-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-5 gap-y-5">
        <div>
          <h3 className="font-semibold text-xl mb-5">Tổng Đài Hỗ Trợ</h3>
          <ul className="flex flex-col gap-y-5">
            <li>
              Liên hệ đặt hàng <strong>097873874</strong>
            </li>
            <li>
              thắc mắc đơn hàng <strong>097873874</strong>
            </li>
            <li>
              góp ý khiếu nại <strong>097873874</strong>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="font-semibold text-xl mb-5">Về sneaker</h3>
          <ul className="flex flex-col gap-y-5">
            <li>Giới thiệu</li>
            <li>Liên hệ</li>
            <li>Tuyển dụng</li>
            <li>Tin tức</li>
            <li>Hệ thống cửa hàng</li>
          </ul>
        </div>
        <div>
          <h3 className="font-semibold text-xl mb-5">Chăm Sóc Khách Hàng</h3>
          <ul className="flex flex-col gap-y-5">
            <li>Chính sách đổi trả</li>
            <li>Chính sách bảo hàng</li>
            <li>Chính sách hoàn tiền</li>
          </ul>
        </div>

        <div>
          <h3 className=" text-4xl text-green-300 font-bold text-shadow-xl mb-5 mt-[-16px]">
            sneaker
          </h3>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias
            omnis delectus deserunt ipsa veritatis quidem error.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
