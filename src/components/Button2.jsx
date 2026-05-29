
import styled from 'styled-components';

const Button2 = () => {
  return (
    <StyledWrapper>
      <div className="button-border">
        <div className="button-base">
          <button className="button"></button>
        </div>
      </div>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
 


  .button {
    border-radius: 100%;
    font-size: 32px;
    outline: 2px solid black;
    border: 4px solid;
    border-left-color: #ffffff;
    border-top-color: #ffffff;
    border-bottom-color: #ffffff;
    border-right-color: #ffffff;
    background-color: #212fff;
    cursor: pointer;
    color: #ffee83;
    padding: 20px 30px;
    transform: translateY(-20%);
    width:4px;
    height:4px;
  }

  .button:hover {
    transform: translateY(-10%); /* Hover durumunda butonu yukarı kaydır */
  }

  .button:active {
    transform: translateY(0); /* Butona tıklanırken konumlandırmayı geri al */
  }`;

export default Button2;
