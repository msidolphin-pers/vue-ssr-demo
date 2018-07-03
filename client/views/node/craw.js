// 说实话 比python好用
const http = require('http')
const cheerio = require('cheerio')

var url = 'http://www.imooc.com/learn/348'

http.get(url, function(response) {
  var html = ''
  response.on('data', function(data) {
    html += data
  })
  response.on('end', function() {
    // 解析html
    var course = parse(html)
    console.log(course)
  })
}).on('error', function() {
  console.log('error!')
})

function parse(html) {
  var $ = cheerio.load(html)
  // 类似jq
  var chapters = $('.chapter.course-wrap')
  var courseData = []
  chapters.each(function(item) {
    var courseChapter = {}
    var chapter = $(this)
    var title = chapter.find('h3').text()
    var desc = chapter.find('.chapter-description').text()
    var videos = chapter.find('.video li')
    
    courseChapter.title = title
    courseChapter.description = desc
    courseChapter.videos = []
    
    videos.each(function(ii) {
      var chapterVideo = {}

      var video = $(this)
      var vid = video.data('media-id')
      var videoItem = video.find('.J-media-item')
    
      var vlink = videoItem.attr('href')
      var vname = videoItem.text()

      chapterVideo.id = vid
      chapterVideo.link = vlink
      chapterVideo.name = vname
      courseChapter.videos.push(chapterVideo)
    })
    courseData.push(courseChapter)
  })
  return courseData
}