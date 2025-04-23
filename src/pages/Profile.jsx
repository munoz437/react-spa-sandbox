import FormInput from '../components/FormInput';
import useProfileForm from '../hooks/useProfileForm';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal);

const Profile = () => {
  const { form, errors, handleChange, validate, resetForm } = useProfileForm();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      try {
        // Show loading alert
        MySwal.fire({
          title: 'Processing...',
          html: 'Please wait while we create your profile',
          allowOutsideClick: false,
          didOpen: () => {
            MySwal.showLoading();
          }
        });

        // Emulate user creation with JSONPlaceholder using fetch
        const response = await fetch('https://jsonplaceholder.typicode.com/users', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            name: form.fullName,
            email: form.email,
            // Password fields aren't part of the JSONPlaceholder schema
            password: form.password,
            confirmPassword: form.confirmPassword
          })
        });

        const data = await response.json();

        // Close loading alert
        MySwal.close();

        // Show success alert
        MySwal.fire({
          title: <strong>Success!</strong>,
          html: <i>Profile created successfully!</i>,
          icon: 'success',
          confirmButtonText: 'Great!',
          confirmButtonColor: '#4CAF50',
          background: '#f8f9fa',
          customClass: {
            title: 'swal2-title-custom',
            content: 'swal2-content-custom'
          }
        });

        console.log('API Response:', data);
        resetForm();
      } catch (error) {
        MySwal.close();
        MySwal.fire({
          title: 'Error!',
          text: 'There was an issue creating your profile',
          icon: 'error',
          confirmButtonText: 'Try Again',
          confirmButtonColor: '#f44336'
        });
        console.error('Error submitting form:', error);
      }
    }
  };

  return (
    <div style={{ 
      padding: '2rem', 
      maxWidth: '600px', 
      margin: '2rem auto',
      backgroundColor: '#ffffff',
      borderRadius: '12px',
      boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif"
    }}>
      <h2 style={{
        textAlign: 'center',
        color: '#2c3e50',
        marginBottom: '1.5rem',
        fontSize: '1.8rem',
        fontWeight: '600',
        letterSpacing: '-0.5px'
      }}>Create Your Profile</h2>
      
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
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

        <button 
          type="submit" 
          style={{ 
            padding: '0.75rem 1.5rem',
            backgroundColor: '#4CAF50',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            fontSize: '1rem',
            fontWeight: '600',
            width: '100%',
            marginTop: '0.5rem',
            transition: 'all 0.3s ease',
            boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
            ':hover': {
              backgroundColor: '#3e8e41',
              transform: 'translateY(-1px)',
              boxShadow: '0 4px 8px rgba(0,0,0,0.15)'
            },
            ':active': {
              transform: 'translateY(0)'
            }
          }}
        >
          Submit Profile
        </button>
      </form>
    </div>
  );
};

export default Profile;