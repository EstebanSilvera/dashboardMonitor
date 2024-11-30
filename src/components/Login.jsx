import { useState } from "react";

const Login = () => {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [information, setInformation] = useState("")

    const sesion = async (e) => {
        e.preventDefault();

        if (email && password) {

            fetch( import.meta.env.VITE_API_URL +'/users/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: email,
                    password: password
                })
            })
                .then(response => response.json())
                .then(data => {
                    if (data.detail === "Inicio de sesion exitoso" ) {
                        localStorage.setItem("ID", data.data.id);
                        localStorage.setItem("USERNAME", data.data.username);
                        localStorage.setItem("ROLE", data.data.role);
                        window.location.href = "/dashboard"
                    } else {
                        alert("Email or password incorrect")
                        console.log("dañao")
                        location.reload();
                    }
                })
                .catch(error => console.error("Error en la solicitud:", error));
        } else {
            alert("Email or password incorrect")
        }

    }

    return (
        <div>

            <div className="flex justify-center items-center min-h-screen bg-gray-100 dark:bg-gray-900">
                <section className="w-96 min-h-80 p-6 py-10 mx-auto bg-white rounded-md shadow-md dark:bg-gray-800">
                    <h2 className="flex justify-center text-2xl font-semibold text-gray-700 dark:text-white">Sign in</h2>

                    <form onSubmit={sesion}>
                        <div className="grid gap-y-4 mt-4">
                            <div>
                                <label className="text-gray-700 dark:text-gray-200" htmlFor="username">Email</label>
                                <input
                                    onChange={(e) => setEmail(e.target.value)}
                                    id="username"
                                    type="text"
                                    className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
                                />
                            </div>

                            <div>
                                <label className="text-gray-700 dark:text-gray-200" htmlFor="password">Password</label>
                                <input
                                    onChange={(e) => setPassword(e.target.value)}
                                    id="password"
                                    type="password"
                                    className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
                                />
                            </div>

                        </div>

                        <div className="flex justify-center mt-6">
                            <button type="submit" className="px-8 py-2.5 leading-5 text-white transition-colors duration-300 transform bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600">
                                Sign in
                            </button>

                        </div>
                    </form>

                </section>

            </div>

        </div>
    )
}

export default Login