import React, { useState } from 'react';
import UserListContainer from '../../components/userListContainer';
import { useGetAllProfilesQuery } from '../../redux/apiSlice';
import { Form, InputGroup } from 'react-bootstrap';

function SearchPage()
{
    const { data } = useGetAllProfilesQuery();
    const profiles = data?.result;

    const [searchText, setSearchText] = useState('');

    // Filter profiles based on the searchText
    const filteredProfiles = profiles?.filter((profile) =>
        profile.username.includes(searchText)
    );

    // Handle input changes
    const handleInputChange = (e) =>
    {
        setSearchText(e.target.value); // Update searchText when the user types
    };

    return (
        <main className='page container'>
            <Form id='search-box' className='mb-4'>
                <InputGroup>
                    <Form.Control
                        type='text' // Specify the input type explicitly
                        placeholder='Search'
                        value={searchText}
                        onChange={handleInputChange}
                    />
                </InputGroup>
            </Form>
            <UserListContainer profiles={filteredProfiles} showClient={false} />
        </main>
    );
}

export default SearchPage;
