class Centered {
    constructor(el) {
        this.el = el;
        this.update_position();
        // this.scroll_event();
    }
    update_position() {
        this.position = this.el.getBoundingClientRect();
    }
    get center_coordinates() {
        return this.position.top + this.position.height / 2
    }
    get screen_center() {
        return window.innerHeight / 2
    }
    center() {
        this.center_offset = this.screen_center -  this.center_coordinates;
        this.bottom_offset = this.screen_center -  this.position.bottom;
        this.direction = this.window_offset > 0 ? 1 : -1;
    }

    get percentage_center() {
        this.update_position();
        this.center();
        let percentage =  this.center_offset * 100 / this.screen_center;
        console.log(`
            direction = ${this.direction}
            element_offset = ${this.center_offset}
            percentage = ${this.center_offset} /  ${this.center_coordinates} 
        `);
        return Math.round(percentage * 100) / 100;
    }
    get percentage_bottom() {
        this.update_position();
        this.center();
        let percentage =  this.bottom_offset * 100 / this.screen_center;
        console.log(`
            window_offset = ${this.window_offset}
            direction = ${this.direction}
            element_offset = ${this.element_offset}
            percentage = ${this.element_offset} /  ${this.center_coordinates} 
        `);
        return Math.round(percentage * 100) / 100;
    }
    scroll_event() {
        this.el.addEventListener('scroll', event => {
            this.update_position()
        })
    }
}

a = new Centered($0)
a.percentage_center