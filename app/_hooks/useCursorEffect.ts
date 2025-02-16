import { useEffect } from 'react';
import { detect } from 'detect-browser';
import { Vector2 } from '@/app/_types/types';

export const useCursorEffect = (isVisible: boolean) => {
  useEffect(() => {
    if (!isVisible) return;

    const browser = detect();
    const isTouchDevices = browser?.os === 'Android OS' || browser?.os === 'iOS';

    class Cursors {
      container: HTMLElement | null;
      mouse: Vector2;
      pos: Vector2;
      diff: Vector2;
      tinyCursor: boolean;
      transitionParticles: { duration: number; delay: number; easing: string } | boolean;
      cursorVisible: boolean;
      widthContainer: number;
      heightContainer: number;
      speed: number;
      rotate: string;
      backColor?: string;
      preserveAspectRatio?: string;
      gradientParticles?: boolean;
      maskCursor?: boolean;
      particles: SVGCircleElement[] = [];
      radiusCursorBack?: number;
      cursor: any;
      svg: SVGSVGElement | null | undefined;
      nodeCursors: NodeListOf<Element> | undefined;
      points: { node: SVGCircleElement; x: number; y: number; }[] | undefined;
      nbrParticles: any;
      fillCursorBack: string | undefined;
      fillOpacityCursorBack: number | undefined;
      strokeColorCursorBack: string | undefined;
      strokeWidthCursorBack: number | undefined;
      strokeOpacityCursorBack: number | undefined;
      radiusCursor: number | undefined;
      fillCursor: string | undefined;
      fillOpacityCursor: number | undefined;
      strokeColorCursor: string | undefined;
      strokeWidthCursor: number | undefined;
      strokeOpacityCursor: number | undefined;
      accelerator: number | undefined;
      squeeze: number | undefined;
      scale: string | undefined;
      filterParticles: string | undefined;
      strokeGradient: any | undefined;
      fillParticles: string | undefined;
      fillOpacityParticles: number | undefined;
      strokeColorParticles: any | undefined;
      strokeWidthParticles: number | undefined;
      strokeOpacityParticles: number | undefined;
      posTrail: { x: number; y: number; } | undefined;
      nextParticle: { node: SVGCircleElement; x: number; y: number; } | undefined;
      delta: number | undefined;
      directionRadius: string | undefined;
      radiusStart: number | undefined;
      radiusDiff: number | undefined;
      radius: number | undefined;
      maxSqueeze: number | undefined;

      constructor() {
        this.container = document.querySelector(`#cursor`);
        this.mouse = { x: 0, y: 0 };
        this.pos = { x: 0, y: 0 };
        this.diff = { x: 0, y: 0 };
        this.tinyCursor = true;
        this.transitionParticles = { duration: 0, delay: 0, easing: '' };
        this.cursorVisible = false;
        this.widthContainer = window.innerWidth;
        this.heightContainer = window.innerHeight;
        this.speed = 0.5;
        this.rotate = '';
        this.mousemoveCursor();
        window.addEventListener('resize', () => this.init());
      }

      mousemoveCursor() {
        window.addEventListener(
          isTouchDevices ? 'touchmove' : 'mousemove',
          (e) => {
            this.updateCoordinates(e);
          },
          { passive: true }
        );
      }

      updateCoordinates(e: MouseEvent | TouchEvent) {
        this.mouse.x = e.type.match('touch') ? (e as TouchEvent).touches[0].clientX : (e as MouseEvent).clientX;
        this.mouse.y = e.type.match('touch') ? (e as TouchEvent).touches[0].clientY : (e as MouseEvent).clientY;
      }

      setParamsDiffs() {
        this.diff.x = this.mouse.x - this.pos.x;
        this.diff.y = this.mouse.y - this.pos.y;
        this.pos.x += this.diff.x * this.speed;
        this.pos.y += this.diff.y * this.speed;
      }

      init() {
        this.tinyCursor ? this.setParamsCursor() : null;
        this.setParamsParticles();
        this.drawCursor();
      }
      setParamsParticles() {
        throw new Error('Method not implemented.');
      }
      setParamsCursor() {
        throw new Error('Method not implemented.');
      }

      loop() {
        this.setParamsDiffs();
        if (this.tinyCursor) {
          this.setTinyCursor();
        }
        this.setParticles();
        requestAnimationFrame(() => this.loop());
      }

      drawCursor() {
        this.widthContainer = window.innerWidth;
        this.heightContainer = window.innerHeight;
        if (this.container) {
          this.container.innerHTML = `<svg
        width="${this.widthContainer}"
        height="${this.heightContainer}"
        viewbox="0 0 ${this.widthContainer} ${this.heightContainer}"
        preserveAspectRatio="${this.preserveAspectRatio || 'none'}"
        style="background:${this.backColor || 'none'}; cursor:${this.cursor ? 'default' : 'none'};">
        ${this.gradientParticles ? this.drawGradient() : ''}
        ${this.maskCursor ? this.drawMaskCursor() : this.drawParticles()}
        ${this.drawTinyCursor()}
        </svg>`;
          this.svg = this.container.querySelector('svg');
          this.tinyCursor ? (this.nodeCursors = this.container.querySelectorAll('.tiny-cursor circle')) : null;
          this.particles = Array.from(this.container.querySelectorAll('.particles circle'));
          this.points = Array(this.nbrParticles)
            .map((el, i) => ({
              node: this.particles[i],
              x: this.pos.x,
              y: this.pos.y,
            }));
        }
      }
      drawMaskCursor() {
        throw new Error('Method not implemented.');
      }
      drawGradient() {
        throw new Error('Method not implemented.');
      }

      drawTinyCursor() {
        return `${
          this.tinyCursor
            ? `<g class="tiny-cursor">
        <circle
          r=${this.radiusCursorBack || 10}
          cx=${this.pos.x}
          cy=${this.pos.y}
          fill="${this.fillCursorBack || 'none'}"
          fill-opacity="${this.fillOpacityCursorBack || 1}"
          stroke="${this.strokeColorCursorBack || 'none'}"
          stroke-width="${this.strokeWidthCursorBack || 1}"
          stroke-opacity="${this.strokeOpacityCursorBack || 1}"
          style="transform-origin: ${this.pos.x}px ${this.pos.y}px">
        </circle>
        <circle
          r=${this.radiusCursor || 10}
          cx=${this.pos.x}
          cy=${this.pos.y}
          fill="${this.fillCursor || 'white'}"
          fill-opacity="${this.fillOpacityCursor || 1}"
          stroke="${this.strokeColorCursor || 'none'}"
          stroke-width="${this.strokeWidthCursor || 0}"
          stroke-opacity="${this.strokeOpacityCursor || 1}"
          style="transform-origin: ${this.pos.x}px ${this.pos.y}px">
        </circle></g>`
            : ''
        }`;
      }

      setTinyCursor() {
        this.rotate = `rotate(${(Math.atan2(this.diff.y, this.diff.x) * 180) / Math.PI}deg)`;
        this.squeeze = Math.min(Math.sqrt(Math.pow(this.diff.x, 2) + Math.pow(this.diff.y, 2)) / (this.accelerator ?? 1), this.maxSqueeze ?? 0);
        this.scale = `scale(${1 + this.squeeze},${1 - this.squeeze})`;
        if (!this.nodeCursors) return;
        for (const [i, tinyCursor] of this.nodeCursors.entries()) {
          tinyCursor.setAttribute('cx', this.pos.x.toString());
          tinyCursor.setAttribute('cy', this.pos.y.toString());
          (tinyCursor as SVGCircleElement).style.transformOrigin = `${this.pos.x}px ${this.pos.y}px`;
          (tinyCursor as SVGCircleElement).style.transform = this.rotate + this.scale;
        }
      }
      calculateMaxSqueeze(arg0: number, maxSqueeze: number): number {
        throw new Error('Method not implemented.');
      }

      drawParticles() {
        return `<g class="particles" filter=${this.filterParticles || 'none'}>
      ${
        this.strokeGradient
          ? `
          <defs>
            <linearGradient id=${this.strokeGradient.idStrokeGradient} x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stop-color=${this.strokeGradient.color1} />
              <stop offset="100%" stop-color=${this.strokeGradient.color2} />
            </linearGradient>
          </defs>`
          : ''
      }
      ${Array(this.nbrParticles)
        .fill(null)
        .map(
          (_, i) =>
            `<circle
          r="${this.setRadiusParticles(i)}"
          cx=${this.pos.x} cy=${this.pos.y}
          fill="${this.fillParticles || 'none'}"
          fill-opacity="${this.fillOpacityParticles || 1}"
          stroke="${this.strokeGradient ? `url(#${this.strokeGradient.idStrokeGradient})` : this.strokeColorParticles}"
          stroke-width="${this.strokeWidthParticles || 0}"
          stroke-opacity="${this.strokeOpacityParticles || 1}"
          id="${i}">
        </circle>`
        )
        .join('')}
    </g>`;
      }

      setParticles() {
        if (this.transitionParticles) {
          for (const [i, particle] of this.particles.entries()) {
            particle.setAttribute('cx', this.pos.x.toString());
            particle.setAttribute('cy', this.pos.y.toString());
            particle.style.transitionProperty = 'cx,cy';
            if (typeof this.transitionParticles !== 'boolean') {
              particle.style.transitionDuration = `${this.transitionParticles.duration + i * this.transitionParticles.delay}ms`;
            }
            if (typeof this.transitionParticles !== 'boolean') {
              particle.style.transitionTimingFunction = this.transitionParticles.easing;
            }
          }
        } else {
          this.posTrail = { x: this.pos.x, y: this.pos.y };
          if (!this.points) return;
          for (const [i, point] of this.points.entries()) {
            this.nextParticle = this.points[i + 1] || this.points[0];
            point.x = this.posTrail.x;
            point.y = this.posTrail.y;
            point.node.setAttribute('cx', this.posTrail.x.toString());
            point.node.setAttribute('cy', this.posTrail.y.toString());
            this.posTrail.x += (this.nextParticle.x - point.x) * (this.delta || 0.9);
            this.posTrail.y += (this.nextParticle.y - point.y) * (this.delta || 0.9);
          }
        }
      }

      setRadiusParticles(i: number) {
        const directionMultiplier = this.directionRadius === '>' ? -1 : 1;
        this.radius = Math.max(0, (this.radiusStart ?? 0) + i * (this.radiusDiff ?? 0) * directionMultiplier);
        return this.radius;
      }

      diagonalWindow() {
        const width = window.innerWidth;
        const height = window.innerHeight;
        return Math.ceil(Math.sqrt(width * width + height * height));
      }
    }
    class Cursor extends Cursors {
      maxSqueeze: number | undefined;
      constructor() {
        super();
        this.speed = !isTouchDevices ? 0.5 : 1;
        this.init();
        this.loop();
      }

      setParamsCursor() {
        this.radiusCursor = 5;
        this.fillCursor = getComputedStyle(document.body).getPropertyValue('--primary');
        this.maxSqueeze = 0.6;
        this.accelerator = 1000;
      }

      setParamsParticles() {
        this.strokeGradient = {
          idStrokeGradient: 'gradient',
          color2: getComputedStyle(document.body).getPropertyValue('--primary'),
          color1: getComputedStyle(document.body).getPropertyValue('--secondary'),
        };
        this.strokeWidthParticles = 1;
        this.strokeOpacityParticles = 0.2;
        this.radiusDiff = 7;
        this.radiusStart = (this.radiusCursor ?? 0) * 3;
        this.nbrParticles = Math.round((this.diagonalWindow() + this.radiusDiff - this.radiusStart) / this.radiusDiff);
        this.transitionParticles = {
          duration: 18,
          delay: !isTouchDevices ? 4 : 14,
          easing: 'linear',
        };
      }
    }

    const cursor = new Cursor();
    return () => {
      window.removeEventListener('resize', cursor.init);
    };
  }, [isVisible]);
};
