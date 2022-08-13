function Debugging() {
    this.circularFrame = function () {
        push();
        noStroke();
        fill("#35524d");
        // fill("##ffffe0");
        ellipse(width / 2, height / 2, width)
        pop();
    }
}