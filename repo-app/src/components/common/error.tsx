const Error = () => {
  const randomImgIndex = Math.floor(Math.random() * 3 + 1);

  return (
    <div className="error">
      <div className={`sprite error-screen${randomImgIndex}`}></div>
    </div>
  );
};

export default Error;
