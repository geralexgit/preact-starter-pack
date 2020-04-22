import {h, FunctionalComponent, Fragment} from 'preact'
import {useStoreon} from 'storeon/preact'

import {getPosts} from '../../actions'

import style from '../Start/Start.css';

const Start: FunctionalComponent = () => {
    const {dispatch, count} = useStoreon('count')
    const windowData = {
        timeOpened: new Date(),
        timezone: (new Date()).getTimezoneOffset() / 60,
        browserName() {
            return navigator.appName
        },
        pageon() {
            return window.location.pathname
        },
        referrer() {
            return document.referrer
        },
        previousSites() {
            return history.length
        },
        browserEngine() {
            return navigator.product
        },
        browserVersion1a() {
            return navigator.appVersion
        },
        browserVersion1b() {
            return navigator.userAgent
        },
        browserLanguage() {
            return navigator.language
        },
        browserOnline() {
            return navigator.onLine
        },
        browserPlatform() {
            return navigator.platform
        },
        javaEnabled() {
            return navigator.javaEnabled()
        },
        dataCookiesEnabled() {
            return navigator.cookieEnabled
        },
        dataCookies1() {
            return document.cookie
        },
        // dataCookies2(){return decodeURIComponent(document.cookie.split(";"))},
        dataStorage() {
            return localStorage
        },

        sizeScreenW() {
            return screen.width
        },
        sizeScreenH() {
            return screen.height
        },
        // sizeDocW(){return document.width},
        // sizeDocH(){return document.height},
        sizeInW() {
            return innerWidth
        },
        sizeInH() {
            return innerHeight
        },
        sizeAvailW() {
            return screen.availWidth
        },
        sizeAvailH() {
            return screen.availHeight
        },
        scrColorDepth() {
            return screen.colorDepth
        },
        scrPixelDepth() {
            return screen.pixelDepth
        },


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
        <Fragment>
            <pre>
                <h1 className={style.h1}>Start</h1>
                {JSON.stringify(windowData, null, 2)}
                {windowData.browserName()}
                {windowData.browserPlatform()}
                {windowData.browserOnline()}
                {windowData.previousSites()}
            </pre>
            <pre><code>
                {count}
            </code></pre>
            <pre>
                <form>
                  <fieldset>
                    <label for="nameField">value</label>
                    <input type="text" placeholder="input value" id="nameField"></input>
                    <input className="button-primary" type="submit" value="Set"/>
                  </fieldset>
                  <fieldset>
                      <button className="button-primary" onClick={(e) => {
                          e.preventDefault()
                          dispatch(getPosts)
                      }}>+</button>
                      <button className="button-primary">-</button>
                  </fieldset>
                </form>
            </pre>
        </Fragment>

    );
};

export default Start
