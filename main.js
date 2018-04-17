let $slides = $('.slides')
let $images = $slides.children('img')
let current = 0

makeFakeSlides()
$slides.hide().offset()
$slides.css({
    transform: 'translateX(-300px)'
}).show()

let timer = setInterval(function () {
    goToSlide(current + 1)
}, 2000)
$('.window').on('mouseenter', function () {
    window.clearInterval(timer)
}).on('mouseleave', function () {
    timer = setInterval(function () {
        goToSlide(current + 1)
    }, 2000)
})

document.addEventListener("visibilitychange", function () {
    if (document.hidden) {
        window.clearInterval(timer)
    } else {
        timer = setInterval(function () {
            goToSlide(current + 1)
        }, 2000)
    }
})

function goToSlide(index) {
    console.log(index)
    if (index > $images.length - 1) {
        index = 0
    } else if (index < 0) {
        index = $images.length - 1
    }
    if (current === $images.length - 1 && index === 0) {
        // 最后一张到第一张
        console.log('here')
        $slides.css({
                transform: `translateX(${-($images.length + 1) * 300}px)`
            })
            .one('transitionend', function () {
                $slides.hide().offset()
                $slides.css({
                    transform: `translateX(${-(index+1)*300}px)`
                }).show()
            })

    } else if (current === 0 && index === $images.length - 1) {
        // 第一张到最后一张
        $slides.css({
                transform: `translateX(0px)`
            })
            .one('transitionend', function () {
                $slides.hide().offset()
                $slides.css({
                    transform: `translateX(${-(index+1)*300}px)`
                }).show()
            })

    } else {
        $slides.css({
            transform: `translateX(${- (index+1) * 300}px)`
        })
    }
    current = index
}

function makeFakeSlides() {
    let $firstCopy = $images.eq(0).clone(true)
    let $lastCopy = $images.eq($images.length - 1).clone(true)

    $slides.append($firstCopy)
    $slides.prepend($lastCopy)
}