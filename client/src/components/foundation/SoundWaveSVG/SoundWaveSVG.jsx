import {zip, mean, chunk, max} from 'lodash';
import React from 'react';

/**
 * @typedef {object} Props
 * @property {ArrayBuffer} soundData
 */

/**
 * @type {React.VFC<Props>}
 */
const SoundWaveSVG = ({ soundData }) => {
  const uniqueIdRef = React.useRef(Math.random().toString(16));
  const [{ max, peaks }, setPeaks] = React.useState({ max: 0, peaks: [] });

  React.useEffect(async () => {
    const audioCtx = new AudioContext();

    // 音声をデコードする
    const buffer = await audioCtx.decodeAudioData(soundData.slice(0));
    // 左の音声データの絶対値を取る
    const leftData = buffer.getChannelData(0).map(Math.abs);
    // 右の音声データの絶対値を取る
    const rightData = buffer.getChannelData(1).map(Math.abs);

    // 左右の音声データの平均を取る
    const normalized = _.zip(leftData, rightData).map(_.mean);
    // 100 個の chunk に分ける
    const chunks = _.chunk(normalized, Math.ceil(normalized.length / 100));
    // chunk ごとに平均を取る
    const peaks = chunks.map( _.mean);
    // chunk の平均の中から最大値を取る
    const max = _.max(peaks);

    setPeaks({ max, peaks });
  }, [soundData]);

  return (
    <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 100 1">
      {peaks.map((peak, idx) => {
        const ratio = peak / max;
        return (
          <rect
            key={`${uniqueIdRef.current}#${idx}`}
            fill="#2563EB"
            height={ratio}
            stroke="#EFF6FF"
            strokeWidth="0.01"
            width="1"
            x={idx}
            y={1 - ratio}
          />
        );
      })}
    </svg>
  );
};

export { SoundWaveSVG };
