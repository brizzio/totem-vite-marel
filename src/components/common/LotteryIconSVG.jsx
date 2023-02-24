import React from 'react'
import { ReactSVG } from 'react-svg'

const LotteryIconSVG = (props) => {

  
  return (
    <ReactSVG
        afterInjection={(svg) => {
            'console.log(svg)'
        }}
        beforeInjection={(svg) => {
            svg.classList.add('svg-class-name')
            // svg.setAttribute('style', 'transform: scale(0.75)')
    
        }}
        className={props.cn}
        evalScripts="always"
        fallback={() => <span>Error!</span>}
        httpRequestWithCredentials={true}
        loading={() => <span>Loading</span>}
        onClick={() => {
            console.log('wrapper onClick')
        }}
        onError={(error) => {
            console.error(error)
        }}
        renumerateIRIElements={false}
        src='lotteryIcon.svg'
        useRequestCache={false}
        wrapper="div"
        />
  )
}

export default LotteryIconSVG