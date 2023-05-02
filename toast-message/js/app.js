function toast ({
    title = '',
    type = '',
    message = 'info',
    duration = 3000,
    animationTiming = 1000
}) {
    const main = document.getElementById('toast')
    const icons = {
        success: 'fa-solid fa-circle-check',
        info: 'fa-solid fa-circle-info',
        warn: 'fa-solid fa-circle-exclamation',
        error: 'fa-solid fa-circle-exclamation'
    }
    // render toast
    const icon = icons[type]
    const toast = document.createElement('div')
    if (toast) {
        toast.classList.add('toast' , `toast--${type}`)
        toast.innerHTML = `
            <div class="toast__icon">
                <i class="${icon}"></i>
            </div>
            <div class="toast__body">
                <div class="toast__detail">
                    <h2 class="toast__title">${title}</h2>
                    <p class="toast__message">${message}</p>
                </div>
                <div class="toast__btn">
                    <i class="fa-solid fa-xmark close-btn"></i>
                </div>
            </div>
        `
        toast.style.animation = 'slideInToView .3s cubic-bezier(0.68, -0.55, 0.25, 1.35) , slideToHide cubic-bezier(0.68, -0.55, 0.25, 1.35) 1s 2s forwards'
        main.appendChild(toast)
        const toastAutoRemove = setTimeout(() => {
            main.removeChild(toast)
        } , duration + animationTiming)

        const closeBtn = document.querySelector('.close-btn')
        closeBtn.onclick = () => {
            clearInterval(toastAutoRemove)
            main.removeChild(toast)
        }
    }
}

