import onMount from './onMount'

const useSegment = (analyticsKey = '0yOKX3CYjZFkA3QFJSN5xBju9qdlmBQR') => {
  onMount(() => {
    // @ts-ignore
    var analytics = (window.analytics = window.analytics || [])
    if (!analytics.initialize)
      if (analytics.invoked)
        window.console &&
          console.error &&
          console.error('Segment snippet included twice.')
      else {
        analytics.invoked = !0
        analytics.methods = [
          'trackSubmit',
          'trackClick',
          'trackLink',
          'trackForm',
          'pageview',
          'identify',
          'reset',
          'group',
          'track',
          'ready',
          'alias',
          'debug',
          'page',
          'once',
          'off',
          'on',
          'addSourceMiddleware',
          'addIntegrationMiddleware',
          'setAnonymousId',
          'addDestinationMiddleware',
        ]
        // @ts-ignore
        analytics.factory = function (e) {
          return function () {
            var t = Array.prototype.slice.call(arguments)
            t.unshift(e)
            analytics.push(t)
            return analytics
          }
        }
        for (var e = 0; e < analytics.methods.length; e++) {
          var key = analytics.methods[e]
          analytics[key] = analytics.factory(key)
        }
        // @ts-ignore
        analytics.load = function (key, e) {
          var t = document.createElement('script')
          t.type = 'text/javascript'
          t.async = !0
          t.src =
            'https://cdn.segment.com/analytics.js/v1/' +
            key +
            '/analytics.min.js'
          var n = document.getElementsByTagName('script')[0]
          // @ts-ignore
          n.parentNode.insertBefore(t, n)
          analytics._loadOptions = e
        }
        analytics._writeKey = analyticsKey
        analytics.SNIPPET_VERSION = '4.15.3'
        analytics.load(analyticsKey)
      }
    // @ts-ignore
    window?.analytics?.page()
  })

  return () => (window as any)?.analytics as any
}

export default useSegment
