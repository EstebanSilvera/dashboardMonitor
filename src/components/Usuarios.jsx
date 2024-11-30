import { useEffect, useState } from 'react';

const Usuarios = () => {
    const [isOpen, setIsOpen] = useState(false);

    const [username, setUsername] = useState("")
    const [role, setRole] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [passwordConfirm, setPasswordconfirm] = useState("")

    const [idUser, setIdUser] = useState(localStorage.getItem("ID"))
    const [roleUser, setRoleUser] = useState(localStorage.getItem("ROLE"))

    const register = async (e) => {
        e.preventDefault()

        const informationUser = [username, role, email, password, passwordConfirm]
        const informationUserFilter = informationUser.filter(response => response !== "")

        if (informationUserFilter.length === 5) {
            if (password === passwordConfirm) {
                if (idUser != 0 && roleUser === "admin") {
                    console.log("Entro")
                    fetch(import.meta.env.VITE_API_URL + '/users/create_user', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            user_id: idUser,
                            username: username,
                            email: email,
                            password: password,
                            role: role
                        })
                    })
                        .then(response => response.json())
                        .then(data => {
                            if (data.detail) {
                                alert(data.detail)
                                setIsOpen(false)
                            }
                        }
                        );
                } else {
                    console.log("ID null or role inappropriate")
                }
            } else {
                console.log("Los passwords no coinciden valecita")
            }
        } else {
            console.log("no esta lleno = ", informationUserFilter)
        }

        // 

    }

    const [users, setUsers] = useState([]);

    useEffect(() => {
        fetch(import.meta.env.VITE_API_URL +'/users/all', {
            page: 1,
            size: 10
        })
            .then(response => response.json())
            .then(data => setUsers(data.data));
    }, [])

    console.log(users)

    return (
        <div className='dark:bg-gray-900 w-full min-h-[100vh]'>
            <section className="w-full p-6 mx-auto bg-white shadow-md dark:bg-gray-800">
                <div className='flex justify-between py-2'>
                    <h2 className="text-lg font-semibold text-gray-700 capitalize dark:text-white">All Users</h2>
                    <div className="flex justify-center text-lg font-semibold text-gray-700 capitalize dark:text-white bg-blue-400 rounded-xl">

                        <button 
                        onClick={() => setIsOpen(true)} 
                        className="px-8 py-2.5 leading-5 text-black dark:text-white transition-colors duration-300 transform rounded-md focus:outline-none text-sm"
                        disabled= {roleUser !== "admin"}
                        >
                            Registrate user
                        </button>

                    </div>
                </div>


                <table className="w-full divide-gray-200 dark:divide-gray-700">
                    <thead className="bg-gray-50 dark:bg-gray-800">
                        <tr>
                            <th scope="col" className="py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                Username
                            </th>

                            <th scope="col" className="px-12 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                Email
                            </th>

                            <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                Role
                            </th>

                            <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                registration time
                            </th>

                            <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                Edit
                            </th>
                        </tr>
                    </thead>
                    {
                        users.map((user) => (
                            <>
                                <tbody key={user.id} className="bg-white divide-y divide-gray-200 dark:divide-gray-700 dark:bg-gray-900">
                                    <tr >
                                        <td className="px-4 py-4 text-sm font-medium whitespace-nowrap">
                                            <div>
                                                <h2 className="font-medium text-gray-800 dark:text-white ">{user.username}</h2>
                                            </div>
                                        </td>
                                        <td className="px-12 py-4 text-sm font-medium whitespace-nowrap">
                                            <div>
                                                <h2 className="font-medium text-gray-800 dark:text-white ">{user.email}</h2>
                                            </div>
                                        </td>
                                        <td className="px-4 py-4 text-sm whitespace-nowrap">
                                            <div>
                                                <h2 className="font-medium text-gray-800 dark:text-white ">{user.role}</h2>
                                            </div>
                                        </td>

                                        <td className="px-4 py-4 text-sm whitespace-nowrap">
                                            <div>
                                                <h2 className="font-medium text-gray-800 dark:text-white ">{new Date(user.created_at).toLocaleString()}</h2>
                                            </div>
                                        </td>

                                        <td className="px-4 py-4 text-sm whitespace-nowrap">
                                            <button className="px-1 py-1 text-gray-500 transition-colors duration-200 rounded-lg dark:text-gray-300 hover:bg-gray-100">
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
                                                    <path d="M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 18.75a.75.75 0 110-1.5.75.75 0 010 1.5z" />
                                                </svg>
                                            </button>
                                        </td>
                                    </tr>
                                </tbody>
                            </>
                        ))
                    }
                </table>


                <div className="relative flex justify-center">

                    {isOpen && (
                        <div
                            className="fixed inset-0 z-10 overflow-y-auto backdrop-blur-lg"
                            aria-labelledby="modal-title"
                            role="dialog"
                            aria-modal="true"
                        >
                            <div className="block items-end justify-center min-h-screen px-4 pt-4 pb-20 text-center">

                                <div
                                    className="relative inline-block py-20 px-4 overflow-hidden text-left align-bottom transition-all transform bg-white rounded-lg shadow-xl dark:bg-gray-800 sm:my-8 sm:w-full sm:max-w-lg sm:p-6 sm:align-middle"
                                >
                                    <h3
                                        className="flex justify-center text-2xl font-medium leading-6 text-gray-800 dark:text-white"
                                        id="modal-title"
                                    >
                                        Registro de usuarios
                                    </h3>

                                    <hr className="mt-6" />

                                    <form onSubmit={register} className="mt-4" action="#">

                                        <div className="flex">
                                            <label htmlFor="emails-list" className="text-sm text-gray-700 dark:text-gray-200 p-4 ">
                                                Username <span className='text-red-600'>*</span>

                                                <input
                                                    onChange={(e) => setUsername(e.target.value)}
                                                    type="text"
                                                    className="w-full px-4 py-3 text-sm text-gray-700 bg-white border border-gray-200 rounded-md focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:focus:border-blue-300 mb-4 mt-2"
                                                />
                                            </label>
                                            <label htmlFor="emails-list" className="text-sm text-gray-700 dark:text-gray-200 p-4 ">
                                                Role

                                                <select
                                                    id="options"
                                                    value={role}
                                                    onChange={(e) => setRole(e.target.value)}
                                                    className="w-full px-4 py-3 text-sm text-gray-700 bg-white border border-gray-200 rounded-md focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:focus:border-blue-300 mb-4 mt-2"
                                                >
                                                    <option value="">-- Select --</option>
                                                    <option value="viewer">Viewer</option>
                                                    <option value="analyst">Analyst</option>
                                                    <option value="admin">Admin</option>
                                                </select>
                                            </label>


                                        </div>

                                        <label htmlFor="emails-list" className="text-sm text-gray-700 dark:text-gray-200 p-4 ">
                                            Email <span className='text-red-600'>*</span>
                                        </label>

                                        <input
                                            onChange={(e) => setEmail(e.target.value)}
                                            type="text"
                                            className="w-full px-4 py-3 text-sm text-gray-700 bg-white border border-gray-200 rounded-md focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:focus:border-blue-300 mb-4 mt-2"
                                        />

                                        <label htmlFor="emails-list" className="text-sm text-gray-700 dark:text-gray-200 p-4 ">
                                            Contraseña <span className='text-red-600'>*</span>
                                        </label>
                                        <input
                                            onChange={(e) => setPassword(e.target.value)}
                                            type="password"
                                            className="w-full px-4 py-3 text-sm text-gray-700 bg-white border border-gray-200 rounded-md focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:focus:border-blue-300 mb-4 mt-2"
                                        />

                                        <label htmlFor="emails-list" className="text-sm text-gray-700 dark:text-gray-200 p-4 ">
                                            Confirmacion de contraseña <span className='text-red-600'>*</span>
                                        </label>
                                        <input
                                            onChange={(e) => setPasswordconfirm(e.target.value)}
                                            type="password"
                                            className="w-full px-4 py-3 text-sm text-gray-700 bg-white border border-gray-200 rounded-md focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:focus:border-blue-300 mb-6 mt-2"
                                        />


                                        <div className="mt-4 sm:flex sm:items-center sm:-mx-2">
                                            <button
                                                type="button"
                                                onClick={() => setIsOpen(false)}
                                                className="w-full px-4 py-2 text-sm font-medium tracking-wide text-gray-700 capitalize transition-colors duration-300 transform border border-gray-200 rounded-md sm:w-1/2 sm:mx-2 dark:text-gray-200 dark:border-gray-700 dark:hover:bg-gray-800 hover:bg-gray-100 focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-40"
                                            >
                                                Cancel
                                            </button>

                                            <button
                                                type="submit"
                                                className="w-full px-4 py-2 mt-3 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-600 rounded-md sm:mt-0 sm:w-1/2 sm:mx-2 hover:bg-blue-500 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40"
                                            >
                                                save user
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </section>

        </div>
    )
}

export default Usuarios