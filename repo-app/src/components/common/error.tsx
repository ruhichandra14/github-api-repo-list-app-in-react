const Error = () => {
  const randomImgIndex = Math.floor(Math.random() * 3 + 1);
  return (
    <div className="error" data-testid="error">
      <div className={`sprite error-screen${randomImgIndex}`}></div>
    </div>
  );
};

export default Error;
