const mysql = require('../config/dbConnection.js')

class PeopleController {
    static addPeople = async (req, res) => {
        const { people_id, village_id, p_name, mobile, gender, nimshashkiy_emp, nimshashkiy_position, political_party_activists, political_party_activists_party, societies_activists_high_edu, societies_activists_high_edu_education, school_stu, gp_member_sarpanch, former_army_or_family, shopkeeper_marchant, progressive_farmer, created_by } = req.body;
        let qry = "CALL add_people(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)";
        mysql.query(qry, [people_id, village_id, p_name, mobile, gender, nimshashkiy_emp, nimshashkiy_position, political_party_activists, political_party_activists_party, societies_activists_high_edu, societies_activists_high_edu_education, school_stu, gp_member_sarpanch, former_army_or_family, shopkeeper_marchant, progressive_farmer, created_by], (err, results) => {
            if (err) throw err
            else {
                if (results.affectedRows > 0) {
                    res.send({ "status": "success", "message": "People inserted successfully" })
                }
            }
        })
    }

    static allPeopleTotal = async (req, res) => {
        let qry = "SELECT COUNT(*) as total FROM people";
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

    static allPeople = async (req, res) => {
        let qry = "CALL get_all_people";
        mysql.query(qry, (err, results) => {
            if (err) throw err
            else {
                if (results.length > 0) {
                    res.send(results);
                }
            }
        })
    }

    static PeopleAndVillageById = async (req, res) => {
        let peopleObj = req.params.id;
        let qry = "CALL get_village_and_people(?)";
        mysql.query(qry, [peopleObj], (err, results) => {
            if (err) throw err
            else {
                if (results.length > 0) {
                    res.send(results)
                }
            }
        })
    }
    static PeopleById = async (req, res) => {
        let peopleObj = req.params.id;
        let qry = "CALL get_people_by_id(?)";
        mysql.query(qry, [peopleObj], (err, results) => {
            if (err) throw err
            else {
                if (results.length > 0) {
                    res.send(results)
                }
            }
        })
    }

    static PeopleByVillege = async (req, res) => {
        let villageObj = req.params.id;
        let qry = "CALL get_people_by_village(?)";
        mysql.query(qry, [villageObj], (err, results) => {
            if (err) throw err
            else {
                if (results.length > 0) {
                    res.send(results)
                }
            }
        })
    }

    static editPeople = async (req, res) => {
        const { people_id, village_id, p_name, mobile, gender, nimshashkiy_emp, nimshashkiy_position, political_party_activists, political_party_activists_party, societies_activists_high_edu, societies_activists_high_edu_education, school_stu, gp_member_sarpanch, former_army_or_family, shopkeeper_marchant, progressive_farmer } = req.body;
        let qry = "CALL update_people(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)";
        mysql.query(qry, [people_id, village_id, p_name, mobile, gender, nimshashkiy_emp, nimshashkiy_position, political_party_activists, political_party_activists_party, societies_activists_high_edu, societies_activists_high_edu_education, school_stu, gp_member_sarpanch, former_army_or_family, shopkeeper_marchant, progressive_farmer], (err, results) => {
            if (err) throw err
            else {
                if (results.affectedRows > 0) {
                    res.send({ "status": "success", "message": "People Updated successfully" })
                }
            }
        })
    }

    static deletePeople = async (req, res) => {
        let peopleObj = req.params.id;
        let qry = "CALL delete_people(?)";
        mysql.query(qry, [peopleObj], (err, results) => {
            if (err) throw err
            else {
                res.send({ "status": "success", "message": "Data deleted" })
            }
        })
    }
    static getPopulation = async (req, res) => {
        let villageObj = req.params.id
        let qryObj = req.params.search
        let qry = "CALL get_populaton(?,?)";
        mysql.query(qry, [qryObj, villageObj], (err, results) => {
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

}

module.exports = PeopleController;