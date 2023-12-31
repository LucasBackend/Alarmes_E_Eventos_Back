
const {BigQuery} = require('@google-cloud/bigquery')

class alarmesController {

async alarmesCelulose(request,response){
    const bigquery = new BigQuery({
        projectId:'sz-00022-ws',
        credentials:{
            client_email:'sa-sami@sz-00022-ws.iam.gserviceaccount.com',
            private_key: '-----BEGIN PRIVATE KEY-----\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQDAX8q2T+3o1bvW\nmI9xDq17N8PxNKVz0eyXva+OwT2yUfB7BjRt7uKR+4fivxT5Qx0wjU/FMJIk1Bko\nygCVUVuVqJNoOXTzlFZq2ehq6dHlUAWu71FdBlInLQblTcFmIhih7hYzPQ1pE2GS\nayFExa23xG/DjNs+2PWFvkfr0iaZPoBkadjIeDSspDKmxJfFDCf5cCGxwc05ogfD\nIRWdxW3isRlho/UEt/I5XZ1UFrR3+ekDL4QvvI6/HYlDNHKv9YzVkHg3Tr9nfA2/\nsCASmxeyqS+sMvpz8LPYFAFBLucYySpKnKCU5LiRZ0CSAyPKL8xCL0hk0bdaLMeh\nkk4XjChJAgMBAAECggEALPQViB3Mb/zGDKMQ3e/6nREOciaFxTdYbKsQQ7EnbCyW\noAD2rnvEqS1YdyWEzqyevRJAgklT1VRU3sG5eisNVj8S1yeaCzNuMEDkfVtPR6E3\n+sWEw1KvTuVIN7xARdAQ5oIe4PFS2WuEgPUUzJ/O9OLr5QvczeZgFVU+ND6i82sN\nzsX5PCLi+KhTZgtPIzWoHqWTIctZC+TFhpwL7eUije3lMGhfNoUeXbpIq6Mc8+n4\n1LXo8sETn2u54Sns8IS9iUHfpltQ8D9PGNrR7NkG/+WBKXHTSB8PS9ldjkaNh6hD\ntW2r28DUt8isVrSL4RxnX9AZJw8v2Q16ZDMYV+2riwKBgQD1xx9eE5AAjSGaJay3\nKOqgcSMyvRs+HHlYR6FOCKPXvNOrgluN+osL/+AJYCTcqtIb45y2s1IYeVvRirca\nCpjhfXktU3DxEiUEnT5qr8VQ/+CcKz/UIPPiaKcJrOWMbjG30ujiCnWL/dS5q+KC\nNf0pAn5HHSk++3Kh/mjT+eBhEwKBgQDIYBAudlphtzrINMFeO1B0YQOlH1o6LMiC\noGP63mfP4nDqAoci5eVOSQ8k6Js8I8v1XU+GlwTuEa4SNQuQ2uR+6ZtcPNbBU71M\nrpGoJwRZmfoDaTrRCgHibcSeuNWsTgELpsbjTQhWLl21yjR679KlLyr97x16B38j\ny6yF14eYswKBgF58lb+KD8NWfoOPVk336fOSazC3aMDBG5lnuEiSo8JtsoZuEBqO\nJmSPkyankqRO+4WDRJ0sZTRJe5YcGPZm+o09updFS9cx3Y9fkD5doqLYLBZ9vgUk\nQf5Zs1XR5VHOj0iXSbaUxMnz5JMY1HSwosngToGyYUf4TQKgFtbfanaHAoGAe51/\n/hn30lbGxeJ99NNk5BdBt2mrMT6ViLjIVWlF5CMPg96BXg80MuKxnBSASE7RMhMZ\nz691VCXGHOdqtjfERWN6/CFwX554p0j/BRzk+x4Z9mbB6VpiJT2Q0la3Q3BwBq8h\n/fJ1FS3PlColzD4N1uhNfpE4vyLG1d9+FKgNuC8CgYBuMC/4zzAphb1TSUcr95B3\nlAIK4CFHUgOAqmexZNDQ7hCMlqITWxmaJRZikZIz7dKtrJwTMVFQi3WJYbQYFbSZ\nLY3xijXZFWqisgtAV394aRohQQDaHAteqt55yIupSFkK5CAJd05ZeSdCOTMARBVZ\nWfJ/aGQmFIgRgvQuMriIhg==\n-----END PRIVATE KEY-----\n'
        }
    });

    const {area} = request.body || ''
    const {datainicio,datafim,procsession,pagination,tag,tipo,alarme,descricao} = request.body
    const dataInicioFormat = `${datainicio.replace('T',' ')}:00.000`
    const dataFimFormat = `${datafim.replace('T',' ')}:59.999`
    const limit = 4000
    const offset = pagination
    
    
    try{
    const data = await bigquery.query(`SELECT alci_cd_identificador,alci_ds_tag,alci_tx_usuario_2,alci_ds_tipo_alarme_1,alci_tx_usuario_1,alci_dt_alarme,alci_dt_final,alci_ds_area,alci_ds_sub_area_2 FROM ${"`"}sz-00022-ws.ALARMES_E_EVENTOS.ALARME_CICLO_CELULOSE${"`"} WHERE alci_ds_origem = "Process(MB300)" AND (alci_ds_sub_area_2 = "${procsession}" OR "${procsession}" = "") AND LOWER(alci_ds_area) LIKE LOWER("%${area}%") AND LOWER(alci_ds_tag) LIKE LOWER("%${tag}%") AND LOWER(alci_tx_usuario_2) LIKE LOWER("%${descricao}%") AND LOWER(alci_ds_tipo_alarme_1) LIKE LOWER("%${tipo}%") AND LOWER(alci_tx_usuario_1) LIKE LOWER("%${alarme}%") AND (alci_dt_alarme>="${dataInicioFormat}" AND alci_dt_alarme<="${dataFimFormat}") ORDER BY alci_cd_identificador DESC LIMIT ${limit} OFFSET ${offset}`);
    return response.status(200).json(data[0])
    }catch(e){
        console.log(e)
    }
       
    
   

}

async alarmesCeluloseSistema(request,response){
    const bigquery = new BigQuery({
        projectId:'sz-00022-ws',
        credentials:{
            client_email:'sa-sami@sz-00022-ws.iam.gserviceaccount.com',
            private_key: '-----BEGIN PRIVATE KEY-----\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQDAX8q2T+3o1bvW\nmI9xDq17N8PxNKVz0eyXva+OwT2yUfB7BjRt7uKR+4fivxT5Qx0wjU/FMJIk1Bko\nygCVUVuVqJNoOXTzlFZq2ehq6dHlUAWu71FdBlInLQblTcFmIhih7hYzPQ1pE2GS\nayFExa23xG/DjNs+2PWFvkfr0iaZPoBkadjIeDSspDKmxJfFDCf5cCGxwc05ogfD\nIRWdxW3isRlho/UEt/I5XZ1UFrR3+ekDL4QvvI6/HYlDNHKv9YzVkHg3Tr9nfA2/\nsCASmxeyqS+sMvpz8LPYFAFBLucYySpKnKCU5LiRZ0CSAyPKL8xCL0hk0bdaLMeh\nkk4XjChJAgMBAAECggEALPQViB3Mb/zGDKMQ3e/6nREOciaFxTdYbKsQQ7EnbCyW\noAD2rnvEqS1YdyWEzqyevRJAgklT1VRU3sG5eisNVj8S1yeaCzNuMEDkfVtPR6E3\n+sWEw1KvTuVIN7xARdAQ5oIe4PFS2WuEgPUUzJ/O9OLr5QvczeZgFVU+ND6i82sN\nzsX5PCLi+KhTZgtPIzWoHqWTIctZC+TFhpwL7eUije3lMGhfNoUeXbpIq6Mc8+n4\n1LXo8sETn2u54Sns8IS9iUHfpltQ8D9PGNrR7NkG/+WBKXHTSB8PS9ldjkaNh6hD\ntW2r28DUt8isVrSL4RxnX9AZJw8v2Q16ZDMYV+2riwKBgQD1xx9eE5AAjSGaJay3\nKOqgcSMyvRs+HHlYR6FOCKPXvNOrgluN+osL/+AJYCTcqtIb45y2s1IYeVvRirca\nCpjhfXktU3DxEiUEnT5qr8VQ/+CcKz/UIPPiaKcJrOWMbjG30ujiCnWL/dS5q+KC\nNf0pAn5HHSk++3Kh/mjT+eBhEwKBgQDIYBAudlphtzrINMFeO1B0YQOlH1o6LMiC\noGP63mfP4nDqAoci5eVOSQ8k6Js8I8v1XU+GlwTuEa4SNQuQ2uR+6ZtcPNbBU71M\nrpGoJwRZmfoDaTrRCgHibcSeuNWsTgELpsbjTQhWLl21yjR679KlLyr97x16B38j\ny6yF14eYswKBgF58lb+KD8NWfoOPVk336fOSazC3aMDBG5lnuEiSo8JtsoZuEBqO\nJmSPkyankqRO+4WDRJ0sZTRJe5YcGPZm+o09updFS9cx3Y9fkD5doqLYLBZ9vgUk\nQf5Zs1XR5VHOj0iXSbaUxMnz5JMY1HSwosngToGyYUf4TQKgFtbfanaHAoGAe51/\n/hn30lbGxeJ99NNk5BdBt2mrMT6ViLjIVWlF5CMPg96BXg80MuKxnBSASE7RMhMZ\nz691VCXGHOdqtjfERWN6/CFwX554p0j/BRzk+x4Z9mbB6VpiJT2Q0la3Q3BwBq8h\n/fJ1FS3PlColzD4N1uhNfpE4vyLG1d9+FKgNuC8CgYBuMC/4zzAphb1TSUcr95B3\nlAIK4CFHUgOAqmexZNDQ7hCMlqITWxmaJRZikZIz7dKtrJwTMVFQi3WJYbQYFbSZ\nLY3xijXZFWqisgtAV394aRohQQDaHAteqt55yIupSFkK5CAJd05ZeSdCOTMARBVZ\nWfJ/aGQmFIgRgvQuMriIhg==\n-----END PRIVATE KEY-----\n'
        }
    });

    const {area} = request.body || ''
    const {datainicio,datafim,procsession,pagination,tag,tipo,alarme,descricao} = request.body
    const dataInicioFormat = `${datainicio.replace('T',' ')}:00.000`
    const dataFimFormat = `${datafim.replace('T',' ')}:59.999`
    const limit = 4000
    const offset = pagination
    
    
    
    try{
    const data = await bigquery.query(`SELECT alci_cd_identificador,alci_ds_tag,alci_tx_usuario_2,alci_ds_tipo_alarme_1,alci_tx_usuario_1,alci_dt_alarme,alci_dt_final,alci_ds_area,alci_ds_sub_area_2 FROM ${"`"}sz-00022-ws.ALARMES_E_EVENTOS.ALARME_CICLO_CELULOSE${"`"} WHERE alci_ds_origem = "SystemAlarm(MB300)" AND (alci_ds_sub_area_2 = "${procsession}" OR "${procsession}" = "") AND LOWER(alci_ds_area) LIKE LOWER("%${area}%") AND LOWER(alci_ds_tag) LIKE LOWER("%${tag}%") AND LOWER(alci_tx_usuario_2) LIKE LOWER("%${descricao}%") AND LOWER(alci_ds_tipo_alarme_1) LIKE LOWER("%${tipo}%") AND LOWER(alci_tx_usuario_1) LIKE LOWER("%${alarme}%") AND (alci_dt_alarme>="${dataInicioFormat}" AND alci_dt_alarme<="${dataFimFormat}") ORDER BY alci_cd_identificador DESC LIMIT ${limit} OFFSET ${offset}`);
    
    return response.status(200).json(data[0])
    }catch(e){
        console.log(e)
    }
       
    
   

}

async alarmesUtilidades(request,response){
    const bigquery = new BigQuery({
        projectId:'sz-00022-ws',
        credentials:{
            client_email:'sa-sami@sz-00022-ws.iam.gserviceaccount.com',
            private_key: '-----BEGIN PRIVATE KEY-----\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQDAX8q2T+3o1bvW\nmI9xDq17N8PxNKVz0eyXva+OwT2yUfB7BjRt7uKR+4fivxT5Qx0wjU/FMJIk1Bko\nygCVUVuVqJNoOXTzlFZq2ehq6dHlUAWu71FdBlInLQblTcFmIhih7hYzPQ1pE2GS\nayFExa23xG/DjNs+2PWFvkfr0iaZPoBkadjIeDSspDKmxJfFDCf5cCGxwc05ogfD\nIRWdxW3isRlho/UEt/I5XZ1UFrR3+ekDL4QvvI6/HYlDNHKv9YzVkHg3Tr9nfA2/\nsCASmxeyqS+sMvpz8LPYFAFBLucYySpKnKCU5LiRZ0CSAyPKL8xCL0hk0bdaLMeh\nkk4XjChJAgMBAAECggEALPQViB3Mb/zGDKMQ3e/6nREOciaFxTdYbKsQQ7EnbCyW\noAD2rnvEqS1YdyWEzqyevRJAgklT1VRU3sG5eisNVj8S1yeaCzNuMEDkfVtPR6E3\n+sWEw1KvTuVIN7xARdAQ5oIe4PFS2WuEgPUUzJ/O9OLr5QvczeZgFVU+ND6i82sN\nzsX5PCLi+KhTZgtPIzWoHqWTIctZC+TFhpwL7eUije3lMGhfNoUeXbpIq6Mc8+n4\n1LXo8sETn2u54Sns8IS9iUHfpltQ8D9PGNrR7NkG/+WBKXHTSB8PS9ldjkaNh6hD\ntW2r28DUt8isVrSL4RxnX9AZJw8v2Q16ZDMYV+2riwKBgQD1xx9eE5AAjSGaJay3\nKOqgcSMyvRs+HHlYR6FOCKPXvNOrgluN+osL/+AJYCTcqtIb45y2s1IYeVvRirca\nCpjhfXktU3DxEiUEnT5qr8VQ/+CcKz/UIPPiaKcJrOWMbjG30ujiCnWL/dS5q+KC\nNf0pAn5HHSk++3Kh/mjT+eBhEwKBgQDIYBAudlphtzrINMFeO1B0YQOlH1o6LMiC\noGP63mfP4nDqAoci5eVOSQ8k6Js8I8v1XU+GlwTuEa4SNQuQ2uR+6ZtcPNbBU71M\nrpGoJwRZmfoDaTrRCgHibcSeuNWsTgELpsbjTQhWLl21yjR679KlLyr97x16B38j\ny6yF14eYswKBgF58lb+KD8NWfoOPVk336fOSazC3aMDBG5lnuEiSo8JtsoZuEBqO\nJmSPkyankqRO+4WDRJ0sZTRJe5YcGPZm+o09updFS9cx3Y9fkD5doqLYLBZ9vgUk\nQf5Zs1XR5VHOj0iXSbaUxMnz5JMY1HSwosngToGyYUf4TQKgFtbfanaHAoGAe51/\n/hn30lbGxeJ99NNk5BdBt2mrMT6ViLjIVWlF5CMPg96BXg80MuKxnBSASE7RMhMZ\nz691VCXGHOdqtjfERWN6/CFwX554p0j/BRzk+x4Z9mbB6VpiJT2Q0la3Q3BwBq8h\n/fJ1FS3PlColzD4N1uhNfpE4vyLG1d9+FKgNuC8CgYBuMC/4zzAphb1TSUcr95B3\nlAIK4CFHUgOAqmexZNDQ7hCMlqITWxmaJRZikZIz7dKtrJwTMVFQi3WJYbQYFbSZ\nLY3xijXZFWqisgtAV394aRohQQDaHAteqt55yIupSFkK5CAJd05ZeSdCOTMARBVZ\nWfJ/aGQmFIgRgvQuMriIhg==\n-----END PRIVATE KEY-----\n'
        }
    });

    const {area} = request.body || ''
    const {datainicio,datafim,procsession,pagination,tag,tipo,alarme,descricao} = request.body
    const dataInicioFormat = `${datainicio.replace('T',' ')}:00.000`
    const dataFimFormat = `${datafim.replace('T',' ')}:59.999`
    const limit = 4000
    const offset = pagination
    
    
    
    try{
    const data = await bigquery.query(`SELECT alci_cd_identificador,alci_ds_tag,alci_tx_usuario_2,alci_ds_tipo_alarme_1,alci_tx_usuario_1,alci_dt_alarme,alci_dt_final,alci_ds_area,alci_ds_sub_area_2 FROM ${"`"}sz-00022-ws.ALARMES_E_EVENTOS.ALARME_CICLO_UTILIDADES${"`"} WHERE alci_ds_origem = "Process(MB300)" AND (alci_ds_sub_area_2 = "${procsession}" OR "${procsession}" = "") AND LOWER(alci_ds_area) LIKE LOWER("%${area}%") AND LOWER(alci_ds_tag) LIKE LOWER("%${tag}%") AND LOWER(alci_tx_usuario_2) LIKE LOWER("%${descricao}%") AND LOWER(alci_ds_tipo_alarme_1) LIKE LOWER("%${tipo}%") AND LOWER(alci_tx_usuario_1) LIKE LOWER("%${alarme}%") AND (alci_dt_alarme>="${dataInicioFormat}" AND alci_dt_alarme<="${dataFimFormat}") ORDER BY alci_cd_identificador DESC LIMIT ${limit} OFFSET ${offset}`);
    return response.status(200).json(data[0])
    }catch(e){
        console.log(e)
    }

}

async alarmesUtilidadesSistema(request,response){
    const bigquery = new BigQuery({
        projectId:'sz-00022-ws',
        credentials:{
            client_email:'sa-sami@sz-00022-ws.iam.gserviceaccount.com',
            private_key: '-----BEGIN PRIVATE KEY-----\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQDAX8q2T+3o1bvW\nmI9xDq17N8PxNKVz0eyXva+OwT2yUfB7BjRt7uKR+4fivxT5Qx0wjU/FMJIk1Bko\nygCVUVuVqJNoOXTzlFZq2ehq6dHlUAWu71FdBlInLQblTcFmIhih7hYzPQ1pE2GS\nayFExa23xG/DjNs+2PWFvkfr0iaZPoBkadjIeDSspDKmxJfFDCf5cCGxwc05ogfD\nIRWdxW3isRlho/UEt/I5XZ1UFrR3+ekDL4QvvI6/HYlDNHKv9YzVkHg3Tr9nfA2/\nsCASmxeyqS+sMvpz8LPYFAFBLucYySpKnKCU5LiRZ0CSAyPKL8xCL0hk0bdaLMeh\nkk4XjChJAgMBAAECggEALPQViB3Mb/zGDKMQ3e/6nREOciaFxTdYbKsQQ7EnbCyW\noAD2rnvEqS1YdyWEzqyevRJAgklT1VRU3sG5eisNVj8S1yeaCzNuMEDkfVtPR6E3\n+sWEw1KvTuVIN7xARdAQ5oIe4PFS2WuEgPUUzJ/O9OLr5QvczeZgFVU+ND6i82sN\nzsX5PCLi+KhTZgtPIzWoHqWTIctZC+TFhpwL7eUije3lMGhfNoUeXbpIq6Mc8+n4\n1LXo8sETn2u54Sns8IS9iUHfpltQ8D9PGNrR7NkG/+WBKXHTSB8PS9ldjkaNh6hD\ntW2r28DUt8isVrSL4RxnX9AZJw8v2Q16ZDMYV+2riwKBgQD1xx9eE5AAjSGaJay3\nKOqgcSMyvRs+HHlYR6FOCKPXvNOrgluN+osL/+AJYCTcqtIb45y2s1IYeVvRirca\nCpjhfXktU3DxEiUEnT5qr8VQ/+CcKz/UIPPiaKcJrOWMbjG30ujiCnWL/dS5q+KC\nNf0pAn5HHSk++3Kh/mjT+eBhEwKBgQDIYBAudlphtzrINMFeO1B0YQOlH1o6LMiC\noGP63mfP4nDqAoci5eVOSQ8k6Js8I8v1XU+GlwTuEa4SNQuQ2uR+6ZtcPNbBU71M\nrpGoJwRZmfoDaTrRCgHibcSeuNWsTgELpsbjTQhWLl21yjR679KlLyr97x16B38j\ny6yF14eYswKBgF58lb+KD8NWfoOPVk336fOSazC3aMDBG5lnuEiSo8JtsoZuEBqO\nJmSPkyankqRO+4WDRJ0sZTRJe5YcGPZm+o09updFS9cx3Y9fkD5doqLYLBZ9vgUk\nQf5Zs1XR5VHOj0iXSbaUxMnz5JMY1HSwosngToGyYUf4TQKgFtbfanaHAoGAe51/\n/hn30lbGxeJ99NNk5BdBt2mrMT6ViLjIVWlF5CMPg96BXg80MuKxnBSASE7RMhMZ\nz691VCXGHOdqtjfERWN6/CFwX554p0j/BRzk+x4Z9mbB6VpiJT2Q0la3Q3BwBq8h\n/fJ1FS3PlColzD4N1uhNfpE4vyLG1d9+FKgNuC8CgYBuMC/4zzAphb1TSUcr95B3\nlAIK4CFHUgOAqmexZNDQ7hCMlqITWxmaJRZikZIz7dKtrJwTMVFQi3WJYbQYFbSZ\nLY3xijXZFWqisgtAV394aRohQQDaHAteqt55yIupSFkK5CAJd05ZeSdCOTMARBVZ\nWfJ/aGQmFIgRgvQuMriIhg==\n-----END PRIVATE KEY-----\n'
        }
    });

    const {area} = request.body || ''
    const {datainicio,datafim,procsession,pagination,tag,tipo,alarme,descricao} = request.body
    const dataInicioFormat = `${datainicio.replace('T',' ')}:00.000`
    const dataFimFormat = `${datafim.replace('T',' ')}:59.999`
    const limit = 4000
    const offset = pagination
    
    
    
    try{
    const data = await bigquery.query(`SELECT alci_cd_identificador,alci_ds_tag,alci_tx_usuario_2,alci_ds_tipo_alarme_1,alci_tx_usuario_1,alci_dt_alarme,alci_dt_final,alci_ds_area,alci_ds_sub_area_2 FROM ${"`"}sz-00022-ws.ALARMES_E_EVENTOS.ALARME_CICLO_UTILIDADES${"`"} WHERE alci_ds_origem = "SystemAlarm(MB300)" AND (alci_ds_sub_area_2 = "${procsession}" OR "${procsession}" = "") AND LOWER(alci_ds_area) LIKE LOWER("%${area}%") AND LOWER(alci_ds_tag) LIKE LOWER("%${tag}%") AND LOWER(alci_tx_usuario_2) LIKE LOWER("%${descricao}%") AND LOWER(alci_ds_tipo_alarme_1) LIKE LOWER("%${tipo}%") AND LOWER(alci_tx_usuario_1) LIKE LOWER("%${alarme}%") AND (alci_dt_alarme>="${dataInicioFormat}" AND alci_dt_alarme<="${dataFimFormat}") ORDER BY alci_cd_identificador DESC LIMIT ${limit} OFFSET ${offset}`);
    return response.status(200).json(data[0])
    }catch(e){
        console.log(e)
    }

}

}

module.exports = alarmesController
