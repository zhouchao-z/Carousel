const Carousel = (() => {
	class Carousel {
		constructor(options) {
			this.oCar = options.oCar;
			this.oCarItem = this.oCar.getElementsByClassName('car-item');
			this.oActive = this.oCar.getElementsByClassName('active')[0];
			this.oDotItem = this.oCar.getElementsByClassName('item');
			this.oCur = this.oCar.getElementsByClassName('current')[0];

			this.timer = null;
			this.speed = options.speed;
			this.curIdx = 0;
			this.init();
		}

		init() {
			this.autoPlay();
			this.bindEvent();
		}

		bindEvent(){ 
			this.oCar.addEventListener('mouseenter', this.mouseInOut.bind(this, 'in'), false);
			this.oCar.addEventListener('mouseleave', this.mouseInOut.bind(this, 'out'), false);
			this.oCar.addEventListener('click', this.carClick.bind(this), false);
		}

		mouseInOut(operator) {
			if(operator === 'in') {
				clearInterval(this.timer);
			} else {
				this.autoPlay();
			}
		}

		autoPlay() {
			this.timer = setInterval(this.run.bind(this), this.speed);
		}

		run() {
			this._setIdx('next');
			this._setPage(this.curIdx);
		}

		carClick(ev) {
			let e = ev || window.event,
				target = e.target || e.srcElement,
				tagName = target.tagName.toLocaleLowerCase();
			if(tagName === 'span') {
        const dir = target.getAttribute('data-dir');
				this._setIdx(dir);
				this._setPage(this.curIdx);
			} else if(tagName === 'i') {
				const curIdx = [].indexOf.call(this.oDotItem, target);
				this.curIdx = curIdx;
				this._setPage(curIdx); // 0  2  1
			}
		}

		_setIdx(dir) {
			switch(dir) {
				case 'next' :
					this.curIdx === (this.oCarItem.length - 1) ? this.curIdx = 0 : this.curIdx++;
					break;
				case 'prev' :
					this.curIdx === 0 ? this.curIdx = this.oCarItem.length - 1 : this.curIdx--;
					break;
				default:
					break;
			}
		}

		_setPage(curIdx) {
			// 设置page的类名
			this.oActive.classList.remove('active');
			this.oCarItem[curIdx].classList.add('active');
			this.oActive = this.oCarItem[curIdx];

			// 设置小圆点的类名
		  this.oCur.classList.remove('current');
			this.oDotItem[curIdx].classList.add('current');
			this.oCur = this.oDotItem[curIdx];	
		}


	}

	return Carousel
})();








