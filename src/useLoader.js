import {useEffect,useState} from 'react';

import { of, fromEvent, from } from 'rxjs';

import {
  delay,
  switchMapTo,
  concatAll,
  count,
  scan,
  withLatestFrom,
  share,
} from 'rxjs/operators';

const requestOne = of('Hacking Google ...').pipe(delay(500));
const requestTwo = of('Hacking Facebook ...').pipe(delay(800));
const requestThree = of('Hacking Micorsoft ...').pipe(delay(1100));
const requestFour = of('Hacking Github ...').pipe(delay(1400));
const requestFive = of('Hacking To Me ...').pipe(delay(1700));

const observables = [
  requestOne,
  requestTwo,
  requestThree,
  requestFour,
  requestFive
];

export const useLoader = () => {
    const [progress,setProgress] = useState(0);
    const [progressText,setProgressText] = useState('');
    useEffect(() => {
        const loadButton = document.getElementById('load');
        const array$ = from(observables);
        const requests$ = array$.pipe(concatAll());
        const clicks$ = fromEvent(loadButton, 'click');
        
        const progress$ = clicks$.pipe(switchMapTo(requests$), share());
        
        const count$ = array$.pipe(count());
        
        const ratio$ = progress$.pipe(
          scan(current => current + 1, 0),
          withLatestFrom(count$, (current, count) => current / count)
        );
        const updateProgress = progressRatio => {
            setProgress(progressRatio);
        };
        
        clicks$.pipe(switchMapTo(ratio$)).subscribe(updateProgress);
        
        const progressSubscirption = progress$.subscribe((data) => setProgressText(data));
        return () => {
            progressSubscirption.unsubscribe();
        }
      },[])
      return {progress,progressText};
}