// Global Variables
let names = 0;

// Create Codo Object
function Codo(query) {
    // Setup Basic Variables
    this.queue = [];
    this.animating = false;

    // Get Codo Element
    this.parent = $(query);

    // Generate Seperate Codo Name
    this.name = names;
    names++;

    // Update Codo HTML
    this.parent.html(`
        <div class="codo-container codo-${this.name}">
            <div class="codo codo-${this.name} old">
                ${this.parent.html()}
            </div>
            <div class="codo codo-${this.name} new">
                ${this.parent.html()}
            </div>
        </div>
    `);

    // Update Variables
    this.codo_container = $('.codo-container.codo-' + this.name);
    this.codo_old = $('.codo.codo-' + this.name + '.old');
    this.codo_new = $('.codo.codo-' + this.name + '.new');

    // Update Codo To New Text
    this.update = function (text) {
        if (text != undefined) {
            // Update Queue
            this.queue.push(text);
        }

        // Check if already animating
        if (!this.animating) {
            // Update animating
            this.animating = true;

            // Update text to be upcoming of queue
            text = this.queue[0];
            this.queue.shift();

            // Update New Text
            this.codo_new.html(text);

            // Update Dimensions
            this.update_dim();

            // Update Animation Classes
            this.codo_new.addClass('in');
            this.codo_old.addClass('out');

            // Change this to that
            let that = this;

            // Wait until animation is done (1.5 seconds)
            setTimeout(function () {
                // Update Old Text
                that.codo_old.html(text);

                // Update Size
                that.update_dim();

                // Remove Classes
                that.codo_old.removeClass('out');
                that.codo_new.removeClass('in');

                // Update Animating Variable
                that.animating = false;

                if (that.queue.length > 0) {
                    that.update();
                }
            }, 1500);
        }
    }

    // Update Dimension Of Codo
    this.update_dim = function () {
        // Reset Width/Height to max-content
        this.codo_old.width('max-content');
        this.codo_new.width('max-content');

        // Check if new text is bigger then old
        if (this.codo_new.width() > this.codo_old.width()) {
            this.codo_container.width(this.codo_new.width() + 'px');
            this.codo_container.height(this.codo_new.height() + 'px');
            this.codo_old.width(this.codo_new.width() + 'px');
            this.codo_old.height(this.codo_new.height() + 'px');
        } else {
            this.codo_container.width(this.codo_old.width() + 'px');
            this.codo_container.height(this.codo_old.height() + 'px');
            this.codo_new.width(this.codo_old.width() + 'px');
            this.codo_new.height(this.codo_old.height() + 'px');
        }
    }

    // Update Codo Dimensions
    this.update_dim();
}