import { getCLS, getFID, getFCP, getLCP, getTTFB, ReportHandler } from 'web-vitals'

const reportWebVitals = (reporter?: ReportHandler) => {
  if (reporter) {
    getCLS(reporter)
    getFID(reporter)
    getFCP(reporter)
    getLCP(reporter)
    getTTFB(reporter)
  }
}

export default reportWebVitals
