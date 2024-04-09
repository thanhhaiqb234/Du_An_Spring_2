export default function ErrorPage(){
    return(
        <section className="page_404">
  <div className="container">
    <div className="row">
      <div className="col-sm-12 ">
        <div className="col-sm-12 col-sm-offset-1  text-center">
          <div className="four_zero_four_bg">
            <h1 className="text-center ">404</h1>
          </div>
          <div className="contant_box_404">
            <h3 className="h2">Có vẻ như đã xảy ra lỗi</h3>
            <p>Trang bạn đang tìm kiếm không có sẵn!</p>
            <a href="/home" className="link_404">
              Về Trang Chủ
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

    )
}