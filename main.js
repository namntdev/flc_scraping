var mongoose = require('mongoose');
var url = require('url');
var Crawler = require("crawler");

mongoose.connect('mongodb://localhost/test', {useNewUrlParser: true});
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // we're connected!
});
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
var Room = mongoose.model('Room', roomSchema);

main();

function main() {
    //Lấy danh sách tất cả các phòng
    var sUrl = 'http://flcsamson.com.vn/vi/flc-luxury-hotel-samson.html';
    getRoomListHotelFLC(sUrl);
    
    // var url_room = 'http://flcsamson.com.vn/vi/flc-luxury-hotel-samson/studio-suite-r4.html';
    // getRoomHotelFLC('title_room', url_room);


    //Lấy thông tin chi tiết của từng phòng
    //getRoombyUrl(String name, String url);
}

function getRoomListHotelFLC(sUrl){
    var c = new Crawler({
        maxConnections : 10,
        // This will be called for each crawled page
        callback : function (error, res, done) {
            if(error){
                console.log(error);
            }else{
                var $ = res.$;
                // $ is Cheerio by default
                //a lean implementation of core jQuery designed specifically for the server
//                console.log($('#boxblock0 .row'));
                $('#boxblock0 .row .col-md-4').each(function (i, e) {
                    var title_room =$(this).find('.item a').attr("title");
                    var url_room = 'http://' + url.parse(sUrl).hostname + $(this).find('.item a').attr("href");
                    //console.log(url_room);
                    getRoomHotelFLC(title_room, url_room);
                    // var data = new Article({ title: title, shortDescription: title, url: url });
                    // data.save();
                });
                //console.log(tinmoi);
                //var data = new Article({ title: title, shortDescription: 'shortDescription', url: 'url' });
                //data.save();
            }
            done();
        }
    });

    // Queue just one URL, with default callback
    c.queue(sUrl);
}

function getRoomHotelFLC(title, sUrl){
    var c = new Crawler({
        maxConnections : 10,
        // This will be called for each crawled page
        callback : function (error, res, done) {
            if(error){
                console.log(error);
            }else{
                var $ = res.$;
                // $ is Cheerio by default
                //a lean implementation of core jQuery designed specifically for the server
//                console.log($('#boxblock0 .row'));
                var shortDescription =  $('.excerpt').text().trim();
                //console.log(shortDescription);
                var attribute_room_list = [];

                $('.tab-content #room p').each(function (i, e) {
                    var attribute_room =$(this).find('b').text();
                    //console.log(attribute_room);
                    var value_attribute_room =$(this).text();
                    value_attribute_room = value_attribute_room.replace(attribute_room, '').trim();
                    //console.log(value_attribute_room);
                    attribute_room_list[i] = value_attribute_room;
                    //getRoomHotelFLC(title_room, url_room);
                    // var data = new Article({ title: title, shortDescription: title, url: url });
                    // data.save();
                });
                var bed = attribute_room_list[0];
                var area = attribute_room_list[1];
                var people = attribute_room_list[2];
                var bathroom = attribute_room_list[3];
                var comfort = [];
                $('.tab-content #comfort li').each(function (i, e) {
                    comfort[i] = $(this).text();
                });
                //console.log(comfort);
                var data = new Room({ title: title, shortDescription: shortDescription, url: sUrl, bed: bed, area: area, people: people, bathroom: bathroom, utility: comfort});
                data.save();
            }
            done();
        }
    });

    // Queue just one URL, with default callback
    c.queue(sUrl);

}




// function getRoomList(String url) {
//     var Crawler = require("crawler");

//     var c = new Crawler({
//         maxConnections : 10,
//     // This will be called for each crawled page
//     callback : function (error, res, done) {
//         if(error){
//             console.log(error);
//         }else{
//             var $ = res.$;
//             // $ is Cheerio by default
//             //a lean implementation of core jQuery designed specifically for the server
//             var title = $("title").text();
//             let tinmoi = [];

//             $('#ulTinMoi li').each(function (i, e) {
//                 var title = $(this).find('.text').text();
//                 var url = 'http://cafebiz.vn' + $(this).find('a').attr("href");
//                 var data = new Article({ title: title, shortDescription: title, url: url });
//                 data.save();
//             });
//             //console.log(tinmoi);
//             //var data = new Article({ title: title, shortDescription: 'shortDescription', url: 'url' });
//             //data.save();
//         }
//         done();
//     }
//     });

//     // Queue just one URL, with default callback
//     c.queue('http://cafebiz.vn/');
// }

