export default {
    inserted: function (el) {
        el = el.getElementsByClassName('el-table__body-wrapper')[0];
        el.style.cursor = 'grab';
        console.log(el,'elllllllllll');

        el.onmousedown = function () {
            let gapX = event.clientX;
            let startX = el.scrollLeft;
            console.log(gapX,
                startX);
            document.onmousemove = function (e) {
                let x = e.clientX - gapX;
                el.scrollLeft = startX - x;
                return false;
            };
            document.onmouseup = function (e) {
                console.log(e);
                document.onmousemove = null;
                document.onmouseup = null;
            };
        };

    }
}