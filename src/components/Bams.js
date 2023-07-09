import { useEffect, useState } from "react";

const Bams = () => {
    // set up states
    const [bams, setBams] = useState([]);

    // backend (db) url
    const url = `http://localhost:4000`;

    // get the tasks
    const getBams = async () => {
		const response = await fetch(url);
		const data = await response.json();
		setBams(data);
	};

    // call the function when the component mounts for the first time
	// useEffect runs AFTER the component mounts and renders whatever
	useEffect(() => {
		// calls the getCoin() function
		getBams();
	}, []); // [] means its an empty dependency array, so it will only run once

    // delete bam
    // const handleDeleteBam = async (bamId) => {
    //     try {
    //         const options = {
    //             method: 'DELETE',
    //             headers: {
    //                 'Content-Type': 'applications/json'
    //             }
    //         };
    //         const responseData = await fetch (`localhost:4000/${bamId}`, options);
    //         console.log('bam deleted');
    //         if (!responseData.ok) {
    //             throw new Error('Failed to delete board');
    //         }
    //         // refresh page after successful deletion
    //         handleRemoveBam(bamId);
    //     } catch (error) {
    //         console.log('Error deleting bam: ', error);
    //     }
    // };

    // const bams = bamsArr.map((bam, index));

    console.log({ bams })

    return (
        <section class="vh-100 gradient-custom-2">
            <div class="container py-5 h-100">
                <div class="row d-flex justify-content-center align-items-center h-100">
                    <div class="col-md-12 col-xl-10">

                        <div class="card mask-custom">
                            <div class="card-body p-4 text-white">

                                <div class="text-center pt-3 pb-2">
                                    <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-todo-list/check1.webp" alt="Check" width="60"/>
                                    <h2 class="my-4">Bams</h2>
                                </div>

                                <table class="table text-white mb-0">
                                    <thead>
                                        <tr>
                                            <th scope="col">Team Member</th>
                                            <th scope="col">Task</th>
                                            <th scope="col">Priority</th>
                                            <th scope="col">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr class="fw-normal">
                                            <th>
                                                <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava1-bg.webp" alt="avatar 1" style="width: 45px; height: auto;"/>
                                                <span class="ms-2">Alice Mayer</span>
                                            </th>
                                            <td class="align-middle">
                                                <span>Call Sam For payments</span>
                                            </td>
                                            <td class="align-middle">
                                                <h6 class="mb-0"><span class="badge bg-danger">High priority</span></h6>
                                            </td>
                                            <td class="align-middle">
                                                <a href="#!" data-mdb-toggle="tooltip" title="Done"><i class="fas fa-check fa-lg text-success me-3"></i></a>
                                                <a href="#!" data-mdb-toggle="tooltip" title="Remove"><i class="fas fa-trash-alt fa-lg text-warning"></i></a>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )   
}

export default Bams;