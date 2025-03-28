import { useMutation, gql } from '@apollo/client';
import { ChangeEvent, FormEvent, useState } from 'react';

const CREATE_USER = gql`
  mutation {
  createUser(user) {
    id
    name
    email
    age
  }
}

`;

const FormComponent = () => {
  const [createUser, { loading, error }] = useMutation(CREATE_USER);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    age: ''
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    const newUser = {
      ...formData,
      age: parseInt(formData.age, 10)
    };
    
    try {
      await createUser({
        variables: { user: newUser },
      });
      setFormData({ name: '', email: '', age: '' }); 
    } catch (err) {
      console.error('Error creating user:', err);
    }
  };

  return (
    <div>
      <h2>Créer un utilisateur</h2>
      <form onSubmit={handleSubmit}>
        <input
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Nom"
          required
        />
        <input
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email"
          required
        />
        <input
          name="age"
          type="number"
          value={formData.age}
          onChange={handleChange}
          placeholder="Âge"
          required
        />
        <button type="submit" disabled={loading}>
          {loading ? 'Envoi...' : 'Envoyer'}
        </button>
      </form>
      {error && <p>Error: {error.message}</p>}
    </div>
  );
};

export default FormComponent;
