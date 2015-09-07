using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Web;

namespace RefugeeAidMap.Web.Common
{
    public static class CustomConfigurationManager
    {
        private static CustomAppSettings _appSettings = new CustomAppSettings();
        public static CustomAppSettings AppSettings { get { return _appSettings; } }
    }
    public class CustomAppSettings
    {
        const string BasePrefix = "APPSETTING_";
        public string AppPrefix { get; set; }
        public string this[string key]
        {
            get
            {
                string prefix = BasePrefix;
                if (!string.IsNullOrEmpty(AppPrefix))
                {
                    prefix += AppPrefix + "_";
                }
                string value = Environment.GetEnvironmentVariable(prefix + key)
                                ?? ConfigurationManager.AppSettings[key];
                return value;
            }
        }

        public string ApplicationName { get { return this["APPLICATION_NAME"] ?? "**App name missing**";} }
        public string EnvironmnentName { get { return this["ENVIRONMENT"]; } }
        public string SqlConnectionString {  get { return this["SQL_CONNECTION"]; } }
    }
}