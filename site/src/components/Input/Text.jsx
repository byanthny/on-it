const Text = (name, placeholder) => {
  return (
    <div className="input-text">
      <input type="text" name={name} placeholder={placeholder} />
      <label for={name}>
        <span className="label-content">{name}</span>
      </label>
    </div>
  );
};

export default Text;
