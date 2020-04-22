import { h, FunctionalComponent } from 'preact'

import style from '../Start/Start.css';

const Start: FunctionalComponent = () => {
    const windowData = {
        timeOpened:new Date(),
        timezone:(new Date()).getTimezoneOffset()/60,
        browserName(){return navigator.appName},
        pageon(){return window.location.pathname},
        referrer(){return document.referrer},
        previousSites(){return history.length},
        browserEngine(){return navigator.product},
        browserVersion1a(){return navigator.appVersion},
        browserVersion1b(){return navigator.userAgent},
        browserLanguage(){return navigator.language},
        browserOnline(){return navigator.onLine},
        browserPlatform(){return navigator.platform},
        javaEnabled(){return navigator.javaEnabled()},
        dataCookiesEnabled(){return navigator.cookieEnabled},
        dataCookies1(){return document.cookie},
        // dataCookies2(){return decodeURIComponent(document.cookie.split(";"))},
        dataStorage(){return localStorage},

        sizeScreenW(){return screen.width},
        sizeScreenH(){return screen.height},
        // sizeDocW(){return document.width},
        // sizeDocH(){return document.height},
        sizeInW(){return innerWidth},
        sizeInH(){return innerHeight},
        sizeAvailW(){return screen.availWidth},
        sizeAvailH(){return screen.availHeight},
        scrColorDepth(){return screen.colorDepth},
        scrPixelDepth(){return screen.pixelDepth},


        // latitude(){return position.coords.latitude},
        // longitude(){return position.coords.longitude},
        // accuracy(){return position.coords.accuracy},
        // altitude(){return position.coords.altitude},
        // altitudeAccuracy(){return position.coords.altitudeAccuracy},
        // heading(){return position.coords.heading},
        // speed(){return position.coords.speed},
        // timestamp(){return position.timestamp},


    };
    return (
        <pre>
            <h1 className={style.h1}>Start</h1>
            {JSON.stringify(windowData, null, 2) }
            {windowData.browserName()}
            {windowData.browserPlatform()}
            {windowData.browserOnline()}
            {windowData.previousSites()}
        </pre>

    );
};

export default Start
