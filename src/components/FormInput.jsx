import '../styles/FormInput.css';

const FormInput = ({ label, type = 'text', name, value, onChange, error }) => {
  return (
    <div className="form-group">
      <label>{label}</label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        autoComplete="off"
      />
      {error && <p className="error">{error}</p>}
    </div>
  );
};

export default FormInput;
