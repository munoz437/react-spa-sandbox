import FormInput from '../components/FormInput';
import useProfileForm from '../hooks/useProfileForm';

const Profile = () => {
  const { form, errors, handleChange, validate, resetForm } = useProfileForm();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      alert('Profile submitted successfully!');
      console.log(form);
      resetForm();
    }
  };

  return (
    <div style={{ padding: '1rem', maxWidth: '500px', margin: 'auto' }}>
      <h2>Profile Form</h2>
      <form onSubmit={handleSubmit}>
        <FormInput
          label="Full Name"
          name="fullName"
          value={form.fullName}
          onChange={handleChange}
          error={errors.fullName}
        />
        <FormInput
          label="Email"
          name="email"
          type="email"
          value={form.email}
          onChange={handleChange}
          error={errors.email}
        />
        <FormInput
          label="Password"
          name="password"
          type="password"
          value={form.password}
          onChange={handleChange}
          error={errors.password}
        />
        <FormInput
          label="Confirm Password"
          name="confirmPassword"
          type="password"
          value={form.confirmPassword}
          onChange={handleChange}
          error={errors.confirmPassword}
        />

        <button type="submit" style={{ padding: '0.5rem 1rem' }}>
          Submit
        </button>
      </form>
    </div>
  );
};

export default Profile;
