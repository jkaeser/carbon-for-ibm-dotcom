/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html, render } from 'lit/html.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import C4DVideoPlayer from '../video-player';
import C4DVideoPlayerComposite from '../video-player-composite';
// Above import is interface-only ref and thus code won't be brought into the build
import '../video-player-composite';

const template = (props?) => {
  const {
    embeddedVideos,
    formatCaption,
    formatDuration,
    hideCaption,
    videoId,
    mediaData,
    playingMode,
  } = props ?? {};
  return html`
    <c4d-video-player-composite
      ?hide-caption="${hideCaption}"
      video-id="${ifDefined(videoId)}"
      .embeddedVideos="${ifDefined(embeddedVideos)}"
      .formatCaption="${ifDefined(formatCaption)}"
      .formatDuration="${ifDefined(formatDuration)}"
      .mediaData="${ifDefined(mediaData)}"
      .playingMode="${ifDefined(playingMode)}">
    </c4d-video-player-composite>
  `;
};

describe('c4d-video-player-composite', function () {
  it('should send props to video player', async function () {
    const formatCaption = () => {};
    const formatDuration = () => {};
    render(
      template({
        formatCaption,
        formatDuration,
        hideCaption: true,
        videoId: 'video-id-foo',
      }),
      document.body
    );
    await Promise.resolve(); // Micro-task cycle for `VideoPlayer`
    await Promise.resolve(); // Update cycle to render with `VideoPlayer` results
    const videoPlayer = document.querySelector(
      'c4d-video-player'
    ) as C4DVideoPlayer;
    expect(videoPlayer.formatCaption).toBe(formatCaption);
    expect(videoPlayer.formatDuration).toBe(formatDuration);
    expect(videoPlayer.hideCaption).toBe(true);
  });

  it('should render the video player', async function () {
    const mediaData = {
      'video-id-foo': {
        name: 'video-name-foo',
        duration: 120,
      },
    };

    render(template({ mediaData, videoId: 'video-id-foo' }), document.body);
    await Promise.resolve();
    expect(
      document.querySelector('c4d-video-player-composite')
    ).toMatchSnapshot();
  });

  it('should activate/deactivate videos as user switches video', async function () {
    render(template({ videoId: 'video-id-foo' }), document.body);
    await Promise.resolve();
    const videoPlayerComposite = document.querySelector(
      'c4d-video-player-composite'
    ) as C4DVideoPlayerComposite;
    videoPlayerComposite.querySelector('c4d-video-player')!.innerHTML = `
      <div data-video-id="video-id-foo"></div>
      <div data-video-id="video-id-bar"></div>
      <div data-video-id="video-id-baz"></div>
    `;
    const embeddedVideoFoo = videoPlayerComposite.querySelector(
      '[data-video-id="video-id-foo"]'
    );
    const embeddedVideoBar = videoPlayerComposite.querySelector(
      '[data-video-id="video-id-bar"]'
    );
    const embeddedVideoBaz = videoPlayerComposite.querySelector(
      '[data-video-id="video-id-baz"]'
    );
    (embeddedVideoFoo as any).sendNotification = jasmine.createSpy();
    (embeddedVideoBar as any).sendNotification = jasmine.createSpy();
    (embeddedVideoBaz as any).sendNotification = jasmine.createSpy();
    videoPlayerComposite.videoId = 'video-id-bar';
    videoPlayerComposite.embeddedVideos = {
      'video-id-foo': embeddedVideoFoo,
      'video-id-bar': embeddedVideoBar,
      'video-id-baz': embeddedVideoBaz,
    };
    await Promise.resolve();
    expect((embeddedVideoFoo as any).sendNotification).toHaveBeenCalledWith(
      'doStop'
    );
    expect((embeddedVideoBar as any).sendNotification).toHaveBeenCalledWith(
      'doPlay'
    );
    expect((embeddedVideoBaz as any).sendNotification).toHaveBeenCalledWith(
      'doStop'
    );
  });

  afterEach(function () {
    render(undefined!, document.body);
  });
});
