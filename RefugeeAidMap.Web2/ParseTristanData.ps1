function GetCoords($address){
    $response = Invoke-RestMethod -Method GET  "https://maps.googleapis.com/maps/api/geocode/json?address=$address&key=AIzaSyB9RVHG-rAnZ3TFdXENvIpuTjhgPVp97Lo"
    if ($response.status -eq "OK"){
        $response.results.geometry.location
    } else {
      if ($response.status -eq "OVER_QUERY_LIMIT"){
        Start-Sleep -Seconds 1
        GetCoords $address
      }
    }
}

$raw = Import-Csv 'C:\Users\Stuart\Downloads\Donation Points for the Refugees of Europe (Responses) - Form Responses 1.csv'

$parsed = $raw | %{
    New-Object PSObject -Property @{ 
        Group = $_.Group
        Title = $_.PSObject.Properties["What is the title of your event / group / page?"].Value
        GroupLink = $_.PSObject.Properties["Please link to your event / group / page"].Value
        Postcode = $_.PSObject.Properties["If you are Receiving, what is the postcode of the Drop off?"].Value
        Locale = $_.PSObject.Properties["What locale is this?"].Value
        Type = $_.PSObject.Properties["What type of action are you promoting?"].Value
        Timestamp = $_.Timestampe
        Duration = $_.Duration
        Business = $_.Business
        Location = GetCoords($_.PSObject.Properties["If you are Receiving, what is the postcode of the Drop off?"].Value) 
    }    
}

#$parsed | Out-GridView

$geocoded = $parsed | %{
    $coords = GetCoords($_.Postcode)
    New-Object PSObject -Property @{ 
        group = $_.Group
        title = $_.Title
        groupLink = $_.GroupLink
        postcode = $_.Postcode
        locale = $_.Locale
        type = $_.$_.Type
        timestamp = $_.Timestampe
        duration = $_.Duration
        business = $_.Business
        lat = $coords.lat
        lng = $coords.lng
    }  
}


#$geocoded | Out-GridView
#$geocoded | ConvertTo-Json | Out-File -FilePath C:\Users\Stuart\Source\Repos\RefugeeAidMap\RefugeeAidMap.Web\Content\TristanData.json