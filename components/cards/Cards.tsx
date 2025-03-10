'use client';
import React, { useCallback } from 'react';
import { EmblaOptionsType, EmblaCarouselType } from 'embla-carousel';
import { PrevButton, NextButton, usePrevNextButtons } from '@/components/cards/EmblaCarouselArrowButtons';
import Autoplay from 'embla-carousel-autoplay';
import useEmblaCarousel from 'embla-carousel-react';

import { Works } from '@/types/types';

import Link from 'next/link';
import styles from '@/components/cards/Cards.module.scss';

import { Afacad } from 'next/font/google';
const afacad = Afacad({
  weight: ['400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
});

const options: EmblaOptionsType = { align: 'start', loop: true };

const EmblaCarousel = ({ works }: { works: Works }) => {
  const [emblaRef, emblaApi] = useEmblaCarousel(options, [Autoplay()]);
  const onNavButtonClick = useCallback((emblaApi: EmblaCarouselType) => {
    const autoplay = emblaApi?.plugins()?.autoplay;
    if (!autoplay) return;
    const resetOrStop = autoplay.options.stopOnInteraction === false ? autoplay.reset : autoplay.stop;
    resetOrStop();
  }, []);

  const { prevBtnDisabled, nextBtnDisabled, onPrevButtonClick, onNextButtonClick } = usePrevNextButtons(emblaApi, onNavButtonClick);

  return (
    <>
      <div className={`${styles.embla}`}>
        <div className={`${styles.embla__viewport}`} ref={emblaRef}>
          <div className={`${styles.embla__container}`}>
            {works.list.map((work) => (
              <div className={`${styles.embla__slide}`} key={work.subject}>
                <article className={`${styles.card}`}>
                  <Link href={`/works/${work.topics_id}`} >
                    <div className={`${afacad.className} ${styles.embla__slide__number}`}>Case {work.topics_id}</div>
                    <h3>{work.subject}</h3>
                    <div>
                      <p className={`${styles.row}`}>
                        <span>Date</span>
                        {new Intl.DateTimeFormat('ja-JP', { year: 'numeric', month: '2-digit', day: '2-digit' }).format(new Date(work.update_ymdhi))}
                      </p>
                      <p className={`${styles.row}`}>
                        <span>Category</span> {work.contents_type_nm}
                      </p>
                    </div>
                  </Link>
                </article>
              </div>
            ))}
          </div>
        </div>

        <div className={`${styles.embla__controls}`}>
          <div className={`${styles.embla__buttons}`}>
            <PrevButton onClick={onPrevButtonClick} disabled={prevBtnDisabled} />
            <NextButton onClick={onNextButtonClick} disabled={nextBtnDisabled} />
          </div>
        </div>
      </div>
    </>
  );
};

export default EmblaCarousel;
