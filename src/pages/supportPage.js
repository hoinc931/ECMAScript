import SupportAPI from "../api/supportAPI";
import { $ } from "../utils";

const SupportPage = {
  async render(){
    return /*html */`
    <div class="container contact mt-5">
      <div class="row">
        <div class="col-md-3">
            <div class="contact-info">
                <img src="https://image.ibb.co/kUASdV/contact-image.png" alt="image"/>
                <h2>Liên hệ với chúng tôi</h2>
                <h4>Hỗ trợ từ 9:00 – 21:00</h4>
            </div>
        </div>
        <div class="col-md-9">
          <div class="contact-form">
            <div class="form-group">
              <label class="control-label" for="name">Họ và Tên:
                <span class="text-danger" style="display:none;" id="dangerName"><i class="fas fa-times-circle"></i></span>
              </label>
              <div class="col-sm-10">          
                <input type="text" class="form-control" id="name" placeholder="Nhập tên đầy đủ" name="name">
              </div>
            </div>
            <div class="form-group">
              <label class="control-label" for="phone">Số điện thoại:
              <span class="text-danger" style="display:none;" id="dangerPhone"><i class="fas fa-times-circle"></i></span>
              </label>
              <div class="col-sm-10">          
                <input type="number" class="form-control" id="phone" placeholder="Nhập số điện thoại" name="phone">
              </div>
            </div>
            <div class="form-group">
              <label class="control-label" for="email">Email:
                <span class="text-danger" style="display:none;" id="dangerEmail"><i class="fas fa-times-circle"></i></span>
              </label>
              <div class="col-sm-10">
                <input type="email" class="form-control" id="email" placeholder="Nhập email" name="email">
              </div>
            </div>
            <div class="form-group">
              <label class="control-label" for="content">Nội dung:
                <span class="text-danger" style="display:none;" id="dangerContent"><i class="fas fa-times-circle"></i></span>
              </label>
              <div class="col-sm-10">
                <textarea class="form-control" rows="5" id="content" placeholder="Nội dung cần hỗ trợ"></textarea>
              </div>
            </div>
            <div class="form-group">        
              <div class="col-sm-offset-2 col-sm-10 pt-3 text-center">
                <button type="submit" class="btn btn-primary px-3"  id="send">Gửi</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    `
  },
  async afterRender(){
    $('#send').addEventListener('click',async e => {
      e.preventDefault();
      var check = 0;
      const name = $('#name').value;
      const phone = $('#phone').value;
      const email = $('#email').value;
      const content = $('#content').value;
      // const phone1 = Number(phone);

      //name
      if(name == "" || name.length < 10){
        $('#dangerName').style.display = "block";
        $('#dangerName i').innerText = "   Vui lòng không để trống và phải lớn hơn 10 ký tự";
        check += 1;
        return false;
      }else{
        $('#dangerName').style.display = "none";
        check = 0;
      }

      //phone
      if(phone == "" || phone.length < 10){
        $('#dangerPhone').style.display = "block";
        $('#dangerPhone i').innerText = "   Vui lòng không để trống và phải lớn hơn 10 ký tự";
        check += 1;
        return false;
      }else{
        $('#dangerPhone').style.display = "none";
        check = 0;
      }

      //email
      const filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
      if(email == ""){
        $('#dangerEmail').style.display = "block";
        $('#dangerEmail i').innerText = "   Vui lòng không để trống!";
        check += 1;
        return false;
      }else if(filter.test(email) == false){
        $('#dangerEmail').style.display = "block";
        $('#dangerEmail i').innerText = "   Nhập đúng định dạng! (Ví dụ: example@gmail.com)";
        check += 1;
        return false;
      }else{
        $('#dangerEmail').style.display = "none";
        check = 0;
      }

      //content
      if(content == ""){
        $('#dangerContent').style.display = "block";
        $('#dangerContent i').innerText = "   Vui lòng nhập nội dung cần hỗ trợ";
        check += 1;
        return false;
      }else{
        $('#dangerContent').style.display = "none";
        check = 0;
      }
      //

      if(check != 0){
        swal({
          title: "Gửi thất bại!!! :(((",
          icon: "warning"
        });
      }else{
        const content1 = {
          // id: 11,
          name: name,
          phone: phone,
          email: email,
          content: content,
        }
        await SupportAPI.send(content1);
        swal("Thành công!", "Gửi hỗ trợ thành công!!", "success");
  
        window.location.hash = ""
      }
      
        
    })
  }
  
}

export default SupportPage;