var TxtRotate = function(el, toRotateA, toRotateT) {
    this.toRotateA = toRotateA;
    this.toRotateT = toRotateT;
    this.el = el;
    this.loopNum = 0;
    this.period = 2000;
    this.txtA = '';
    this.txtT = '';
    this.tick();
    this.isDeleting = false;
  };
  
  TxtRotate.prototype.tick = function() {
    var iA = this.loopNum % this.toRotateA.length;
    var iT = this.loopNum % this.toRotateT.length;
  
    var fullTxtA = this.toRotateA[iA];
    var fullTxtT = this.toRotateT[iT];
  
    if (this.isDeleting) {
      if(this.txtA != '') {
        this.txtA = fullTxtA.substring(0, this.txtA.length - 1);
      }
      if (this.txtT != '') {
        this.txtT = fullTxtT.substring(0, this.txtT.length - 1);
      }
    } else {
      if(this.txtA != fullTxtA) {
        this.txtA = fullTxtA.substring(0, this.txtA.length + 1);
      }
      if(this.txtT != fullTxtT)
      this.txtT = fullTxtT.substring(0, this.txtT.length + 1);
    }
  
    this.el[0].innerHTML = '<span class="wrap">'+this.txtA+'</span>';
    this.el[1].innerHTML = '<span class="wrap">'+this.txtT+'</span>';
  
  
    var that = this;
    var delta = 250 - Math.random() * 100;
  
    if (this.isDeleting) { delta /= 2; }
  
    if (!this.isDeleting && this.txtA === fullTxtA && this.txtT == fullTxtT) {
      if (iA == iT == 0) {
        delta = 3000;
      } else {
        delta = this.period;
      }
                                                                                                                                                          this.isDeleting = true;
    } else if (this.isDeleting && this.txtA === '' && this.txtT === '') {
      this.isDeleting = false;
      this.loopNum++;
      delta = 400;
    }
  
    setTimeout(function() {
      that.tick();
    }, delta);
  };
  
  window.onload = function() {
    var elements = document.getElementsByClassName('txt-rotate');
  
    var toRotateA = elements[0].getAttribute('data-rotate');
    var toRotateT = elements[1].getAttribute('data-rotate');
  
    new TxtRotate(elements, JSON.parse(toRotateA), JSON.parse(toRotateT));
  
    // INJECT CSS
    var css = document.createElement("style");
    css.type = "text/css";
    css.innerHTML = ".txt-rotate > .wrap { border-right: 0.15em solid #cc5959 }";
    document.body.appendChild(css);
  };