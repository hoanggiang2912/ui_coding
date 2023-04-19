window.addEventListener('load', () => {
    const links = [...document.querySelectorAll(".nav_item_link")]
    const line = document.createElement("div")
    document.body.appendChild(line)
    line.className = 'line'

    links.forEach(link => {
        link.addEventListener('mouseenter', handleHoverEffect)
        var offsetHeight = 5
        function handleHoverEffect(e) {
            const { top, left, width, height } = e.target.getBoundingClientRect()
            console.log(top, left, width, height);
            line.style.width = `${width}px`
            line.style.top = `${top + height + offsetHeight}px`
            line.style.left = `${left}px`
            line.style.transform = 'scale(1)'
            line.style.transition = '0.25s linear'
        }
        link.addEventListener('mouseout', () => {
            line.style.transform = 'scale(0)'
        })
    })
})