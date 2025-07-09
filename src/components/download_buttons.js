import React from 'react';
import styled from 'styled-components';

const DownloadButton = ({ theme = 'dark', t }) => {
  return (
    <StyledWrapper theme={theme}>
      <div className="container">
        <label className="label">
          <input type="checkbox" className="input" />
          <span className="circle"><svg className="icon" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 19V5m0 14-4-4m4 4 4-4" />
            </svg>
            <div className="square" />
          </span>
          <p className="title">{t ? t('downloadCV') : 'Download CV'}</p>
          <p className="title">{t ? t('downloaded') || 'Downloaded!' : 'Downloaded!'}</p>
        </label>
      </div>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  .container {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
    font-family: Inter, system-ui, -apple-system, sans-serif;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .label {
    background-color: transparent;
    border: 2px solid ${props => props.theme === 'dark' ? 'rgb(79, 70, 229)' : 'rgb(59, 130, 246)'};
    display: flex;
    align-items: center;
    border-radius: 50px;
    width: 180px;
    cursor: pointer;
    transition: all 0.4s ease;
    padding: 5px;
    position: relative;
    backdrop-filter: blur(8px);
    background: ${props => props.theme === 'dark' 
      ? 'rgba(255, 255, 255, 0.05)' 
      : 'rgba(255, 255, 255, 0.7)'};
  }

  .label::before {
    content: "";
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: ${props => props.theme === 'dark' ? '#fff' : '#1f2937'};
    width: 8px;
    height: 8px;
    transition: all 0.4s ease;
    border-radius: 100%;
    margin: auto;
    opacity: 0;
    visibility: hidden;
  }

  .label .input {
    display: none;
  }

  .label .title {
    font-size: 16px;
    color: ${props => props.theme === 'dark' ? '#fff' : '#1f2937'};
    font-weight: 600;
    transition: all 0.4s ease;
    position: absolute;
    right: 18px;
    bottom: 14px;
    text-align: center;
  }

  .label .title:last-child {
    opacity: 0;
    visibility: hidden;
    left: 50%;
    transform: translateX(-50%);
    right: unset;
    white-space: nowrap;
  }

  .label .circle {
    height: 45px;
    width: 45px;
    border-radius: 50%;
    background: ${props => props.theme === 'dark' 
      ? 'linear-gradient(135deg, rgb(79, 70, 229), rgb(124, 58, 237))'
      : 'linear-gradient(135deg, rgb(59, 130, 246), rgb(147, 51, 234))'};
    display: flex;
    justify-content: center;
    align-items: center;
    transition: all 0.4s ease;
    position: relative;
    box-shadow: 0 0 0 0 ${props => props.theme === 'dark' ? 'rgba(255, 255, 255, 0.7)' : 'rgba(79, 70, 229, 0.7)'};
    overflow: hidden;
  }

  .label .circle .icon {
    color: #fff;
    width: 24px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    transition: all 0.4s ease;
  }

  .label .circle .square {
    aspect-ratio: 1;
    width: 12px;
    border-radius: 2px;
    background-color: #fff;
    opacity: 0;
    visibility: hidden;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    transition: all 0.4s ease;
  }

  .label .circle::before {
    content: "";
    position: absolute;
    left: 0;
    top: 0;
    background: ${props => props.theme === 'dark' 
      ? 'linear-gradient(135deg, rgb(59, 130, 246), rgb(147, 51, 234))'
      : 'linear-gradient(135deg, rgb(34, 197, 94), rgb(16, 185, 129))'};
    width: 100%;
    height: 0;
    transition: all 0.4s ease;
  }

  .label:hover {
    border-color: ${props => props.theme === 'dark' ? 'rgb(124, 58, 237)' : 'rgb(147, 51, 234)'};
    transform: translateY(-2px);
    box-shadow: 0 8px 25px ${props => props.theme === 'dark' 
      ? 'rgba(79, 70, 229, 0.3)' 
      : 'rgba(59, 130, 246, 0.3)'};
  }

  .label:has(.input:checked) {
    width: 57px;
    animation: installed 0.4s ease 3.5s forwards;
  }

  .label:has(.input:checked)::before {
    animation: rotate 3s ease-in-out 0.4s forwards;
  }

  .label .input:checked + .circle {
    animation:
      pulse 1s forwards,
      circleDelete 0.2s ease 3.5s forwards;
    rotate: 180deg;
  }

  .label .input:checked + .circle::before {
    animation: installing 3s ease-in-out forwards;
  }

  .label .input:checked + .circle .icon {
    opacity: 0;
    visibility: hidden;
  }

  .label .input:checked ~ .circle .square {
    opacity: 1;
    visibility: visible;
  }

  .label .input:checked ~ .title {
    opacity: 0;
    visibility: hidden;
  }

  .label .input:checked ~ .title:last-child {
    animation: showInstalledMessage 0.4s ease 3.5s forwards;
  }

  @keyframes pulse {
    0% {
      scale: 0.95;
      box-shadow: 0 0 0 0 ${props => props.theme === 'dark' 
        ? 'rgba(255, 255, 255, 0.7)' 
        : 'rgba(79, 70, 229, 0.7)'};
    }
    70% {
      scale: 1;
      box-shadow: 0 0 0 16px ${props => props.theme === 'dark' 
        ? 'rgba(255, 255, 255, 0)' 
        : 'rgba(79, 70, 229, 0)'};
    }
    100% {
      scale: 0.95;
      box-shadow: 0 0 0 0 ${props => props.theme === 'dark' 
        ? 'rgba(255, 255, 255, 0)' 
        : 'rgba(79, 70, 229, 0)'};
    }
  }

  @keyframes installing {
    from {
      height: 0;
    }
    to {
      height: 100%;
    }
  }

  @keyframes rotate {
    0% {
      transform: rotate(-90deg) translate(27px) rotate(0);
      opacity: 1;
      visibility: visible;
    }
    99% {
      transform: rotate(270deg) translate(27px) rotate(270deg);
      opacity: 1;
      visibility: visible;
    }
    100% {
      opacity: 0;
      visibility: hidden;
    }
  }

  @keyframes installed {
    100% {
      width: 150px;
      border-color: ${props => props.theme === 'dark' ? 'rgb(34, 197, 94)' : 'rgb(16, 185, 129)'};
    }
  }

  @keyframes circleDelete {
    100% {
      opacity: 0;
      visibility: hidden;
    }
  }

  @keyframes showInstalledMessage {
    100% {
      opacity: 1;
      visibility: visible;
    }
  }`;

export default DownloadButton;
