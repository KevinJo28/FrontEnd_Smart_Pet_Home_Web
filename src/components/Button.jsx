
import styled from 'styled-components';

const Button = ({color}) => {
  return (
    <StyledWrapper  color={color}>
      <button className="btn"></button>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  .btn {
    position: relative;
    font-size: 17px;
    text-transform: uppercase;
    text-decoration: none;
    padding: 30px 30px;
    display: inline-block;
    border-radius: 100px;
    border: none;
    font-family: inherit;
    font-weight: 500;
    color: black;
    background-color: ${({ color }) => color || "#d46969"};
    cursor:default;
  }
`;

export default Button;
