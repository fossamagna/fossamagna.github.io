import React from "react"
import PropTypes from "prop-types"

const Speakerdeck = props => {
  const wrapperStyle = {
    left: 0,
    width: "100%",
    height: 0,
    position: "relative",
    paddingBottom: props.paddingBottom || "75.1972%",
  }
  const iframeStyle = {
    border: 0,
    width: "100%",
    height: "100%",
    position: "absolute",
  }
  const url = `https://speakerdeck.com/player/${props.slideId}`
  return (
    <div className="iframe-wrapper" style={wrapperStyle}>
      <iframe
        title={props.title}
        style={iframeStyle}
        src={url}
        allow={"fullscreen"}
      ></iframe>
    </div>
  )
}

Speakerdeck.propTypes = {
  slideId: PropTypes.string.isRequired,
  title: PropTypes.string,
  paddingBottom: PropTypes.string,
}

export default Speakerdeck
