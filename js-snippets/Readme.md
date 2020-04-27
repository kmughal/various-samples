# Introduction

## Security notes
- https://securityheaders.com/ use this to check the security headers
- Enable Content-Security-Policy
- Enable XXS Protection mode by "X-XSS-Protection": "1; mode=block"
- Disable iFrame "X-Frame-Options": "DENY"
- Good practice to disable some of the features what browser offers by "Feature-Policy": "accelerometer 'none'; ambient-light-sensor 'none'; autoplay 'none'; camera 'none'; encrypted-media 'none'; fullscreen 'self'; geolocation 'none'; gyroscope 'none'; magnetometer 'none'; microphone 'none'; midi 'none'; payment 'none';  picture-in-picture 'none'; speaker 'none'; sync-xhr 'none'; usb 'none'; vr 'none';"
- Dont't expose the referrer information by adding "Referrer-Policy": "no-referrer"
- Don't use the innerHTML property instead of that use textContent
- Use the integrity property for third party libraries. for reference https://developer.mozilla.org/en-US/docs/Web/Security/Subresource_Integrity

```
<script src="https://example.com/example-framework.js"
        integrity="sha384-oqVuAfXRKap7fdgcCY5uykM6+R9GqQ8K/ux..."
        crossorigin="anonymous"></script>

```
