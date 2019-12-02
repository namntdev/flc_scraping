# flc_scraping
### Bài toán:
Lấy dữ liệu phòng của hotel từ http://flcsamson.com.vn/vi/flc-luxury-hotel-samson.html

### 1. Lựa chọn công nghệ:
Tham khảo các tool thương mại giúp web scraping thực hiện thông qua giao diện như:
* https://www.parsehub.com/
* https://www.octoparse.com/
* https://www.scrapestorm.com/

Tìm các tool open source phù hợp để đẩy nhanh việc thực hiện crawler data. Có thể tham khảo các tool sau:
* Danh sách các tool đã được tổng hợp https://github.com/BruceDone/awesome-crawler
* http://www.nightmarejs.org
* https://developers.google.com/web/tools/puppeteer/
* …

### 2. Các bước thực hiện:
* Sử dụng ngôn ngữ nodejs
* Sử dụng tool https://github.com/bda-research/node-crawler
* Code truy cập vào http://flcsamson.com.vn/vi/flc-luxury-hotel-samson.html rồi parse data html trả về
* Lưu vào database mongodb

### 4. Các bước build code và run
* Cài đặt database mongoDB, đảm bảo file main.js cấu hình đúng thông tin database
* Install các package cần thiết: npm install
* Chạy chương trình chạy lệnh: node main.js

### 3. Kết quả lưu vào mongodb như hình
**Schema database**
```nodejs	
	var roomSchema = new mongoose.Schema({
	  title: String, // Loại phòng
	  shortDescription: String, //Mô tả vắn tắt
	  url: String, // URL chi tiết
	  bed: String, // Giường ngủ
	  area: String, // Diện tích phòng
	  people: String, // Sức chứa
	  bathroom: String, // Phòng tắm
	  utility: [String] // tiện ích
	});
```

**Result in database**

<kbd><img title="Result in database" src="https://raw.githubusercontent.com/namntdev/flc_scraping/master/result1.png"></kbd><br/>
<kbd><img title="Result in database" src="https://raw.githubusercontent.com/namntdev/flc_scraping/master/result.png"></kbd><br/>
