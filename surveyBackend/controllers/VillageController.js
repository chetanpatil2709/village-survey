const mysql = require('../config/dbConnection.js')

class VillageController {
    static addVillage = async (req, res) => {
        const { village_name, post, pincode, talathi_office, grampaanchayat, jp_circle, ps_circle, prathmik_aarogya_kendra, mseb_office, patsantha_shakha, bank, gas_agency, school, temple_statue_name, village_major_problems_demands, means_of_communication,
            talathi_name, talathi_mobile, gramsevak_name,
            gramsevak_mobile, agri_assistant_name, agri_assistant_mobile, electrician_name,
            electrician_mobile, gp_emp_name, gp_emp_mobile, doctors_name, doctors_mobile,
            aasha_name, aasha_mobile, police_patil_name, police_patil_mobile, tantamukti_chif_name,
            tantamukti_chif_mobile, kotval_name, kotval_mobile, insurance_agent_name,
            insurance_agent_mobile, ration_shopkeeper_name, ration_shopkeeper_mobile,
            village_sketch, roads_connecting_village,
            created_by } = req.body;
        let qry = "CALL add_village(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)";
        mysql.query(qry, [village_name, post, pincode, talathi_office, grampaanchayat, jp_circle, ps_circle, prathmik_aarogya_kendra, mseb_office, patsantha_shakha, bank, gas_agency, school, temple_statue_name, village_major_problems_demands, means_of_communication, talathi_name, talathi_mobile, gramsevak_name,
            gramsevak_mobile, agri_assistant_name, agri_assistant_mobile, electrician_name,
            electrician_mobile, gp_emp_name, gp_emp_mobile, doctors_name, doctors_mobile,
            aasha_name, aasha_mobile, police_patil_name, police_patil_mobile, tantamukti_chif_name,
            tantamukti_chif_mobile, kotval_name, kotval_mobile, insurance_agent_name,
            insurance_agent_mobile, ration_shopkeeper_name, ration_shopkeeper_mobile, village_sketch, roads_connecting_village,
            created_by], (err, results) => {
                if (err)
                    throw err
                else {
                    if (results.affectedRows > 0) {
                        res.send({ "status": "success", "message": "village added successfully" })
                    } else {
                        res.send({ "status": "faild", "message": "Something wrong" })
                    }
                }
            })
    }

    static allVillageTotal = async (req, res) => {
        let qry = "SELECT COUNT(*) as total FROM village";
        mysql.query(qry, (err, results) => {
            if (err) throw err
            else {
                if (results) {
                    res.send({ "status": "success", "COUNT": results[0] })
                } else {
                    res.send({ "status": "faild", "COUNT": results[0] })
                }
            }
        })
    }

    static allVillage = async (req, res) => {
        let qry = "CALL get_all_villages";
        mysql.query(qry, (err, results) => {
            if (err) throw err
            else {
                res.send(results)
            }
        })
    }
    static villageById = async (req, res) => {
        let qryObj = req.params.id;
        let qry = "CALL get_village_by_id(?)";
        mysql.query(qry, [qryObj], (err, results) => {
            if (err) throw err
            else {
                res.send(results)
            }
        })
    }

    static editVillage = async (req, res) => {
        let qryObj = req.params.id;
        let { village_id, village_name, post, pincode, talathi_office, grampaanchayat, jp_circle, ps_circle, prathmik_aarogya_kendra, mseb_office, patsantha_shakha, bank, gas_agency, school, temple_statue_name, village_major_problems_demands, means_of_communication,
            talathi_name, talathi_mobile, gramsevak_name,
            gramsevak_mobile, agri_assistant_name, agri_assistant_mobile, electrician_name,
            electrician_mobile, gp_emp_name, gp_emp_mobile, doctors_name, doctors_mobile,
            aasha_name, aasha_mobile, police_patil_name, police_patil_mobile, tantamukti_chif_name,
            tantamukti_chif_mobile, kotval_name, kotval_mobile, insurance_agent_name,
            insurance_agent_mobile, ration_shopkeeper_name, ration_shopkeeper_mobile,
            village_sketch, roads_connecting_village,
            created_by } = req.body;
        let qry = "CALL update_village(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)";
        mysql.query(qry, [village_id, village_name, post, pincode, talathi_office, grampaanchayat, jp_circle, ps_circle, prathmik_aarogya_kendra, mseb_office, patsantha_shakha, bank, gas_agency, school, temple_statue_name, village_major_problems_demands, means_of_communication,
            talathi_name, talathi_mobile, gramsevak_name,
            gramsevak_mobile, agri_assistant_name, agri_assistant_mobile, electrician_name,
            electrician_mobile, gp_emp_name, gp_emp_mobile, doctors_name, doctors_mobile,
            aasha_name, aasha_mobile, police_patil_name, police_patil_mobile, tantamukti_chif_name,
            tantamukti_chif_mobile, kotval_name, kotval_mobile, insurance_agent_name,
            insurance_agent_mobile, ration_shopkeeper_name, ration_shopkeeper_mobile,
            village_sketch, roads_connecting_village,
            created_by], (err, results) => {
                if (err) throw err
                if (results.affectedRows > 0) {
                    res.send({ "status": "success", "message": "Village Updated successfully" })
                }
            })

    }
    static deleteVillage = async (req, res) => {
        let villageObj = req.params.id;
        let qry = "CALL delete_village(?)";
        mysql.query(qry, [villageObj], (err, results) => {
            if (err) throw err
            else {
                res.send("Data deleted")
            }
        })
    }
    static allDataByVillage = async (req, res) => {
        let villageObj = req.params.id;
        let qry = "CALL get_all_data_by_village";
        mysql.query(qry, [villageObj], (err, results) => {
            if (err) throw err
            else {
                res.send(results)
            }
        })
    }
    static getAllDataOfVillage = async (req, res) => {
        let villageObj = req.params.id
        let qryObj = req.params.search
        let qry = "CALL get_all_data_of_village(?,?)";
        mysql.query(qry, [qryObj, villageObj], (err, results) => {
            if (err) throw err
            else {
                res.send(results)
            }
        })
    }

    static uploadSketch = async (req, res) => {
        // console.log('req', req.file.originalname)
    }
}
module.exports = VillageController;